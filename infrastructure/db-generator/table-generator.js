import { format } from '../extentions';
import { sequelize } from '../../helpers/sequelize';
import { query } from '../../helpers/pg-helper';
import { AbstractGenerator } from './abstract-generator';

export class  TableGenerator extends AbstractGenerator {
  constructor(tableName, schemaName, freezeTableName) {
    super(schemaName);

    this.tableName       = tableName;
    this.freezeTableName = freezeTableName;

    this.schema += (require(this.configFile).isPrivate) ? '_private' : '';
  }

  get tableNameSnakeCase() {
    return this.tableName.replace(/-/g,'_');
  }

  get schemaSnakeCase() {
    return this.schema.replace(/-/g,'_');
  }

  get rootPath() {
    return format(`../../models/{0}/`, this.tableName);
  }

  get configFile() {
    return format(this.rootPath + '{0}-config', this.tableName);
  }

  get schemaFile() {
    return format(this.rootPath + '{0}-schema', this.tableName);
  }

  get accessRulesFile() {
    return format(this.rootPath + '{0}-access-rules.sql', this.tableName);
  }

  get accessRulesRevokeFile() {
    return format(this.rootPath + '{0}-access-rules-revoke.sql', this.tableName);
  }

  create() {
    const { schema } = require(this.schemaFile);
    const options = {
      freezeTableName: this.freezeTableName,
      schema: this.schemaSnakeCase
    };
    const model      = sequelize.define(this.tableNameSnakeCase, schema, options);
    const sql        = this.loadQuery(this.accessRulesFile, this.schemaSnakeCase, this.tableNameSnakeCase);

    return model.schema(this.schemaSnakeCase).sync().then(() => query(sql));
  };

  drop() {
    const preRevokeScript = 'REVOKE ALL PRIVILEGES ON {0}.{1} FROM anonymous, active_user, inactive_user;';
    const revokeScript    = super.loadQuery(this.accessRulesRevokeFile, this.schemaSnakeCase, this.tableNameSnakeCase);
    const dropScript      = 'DROP TABLE {0}.{1};';

    const script = preRevokeScript + revokeScript + dropScript;
    const sql    = format(script, this.schemaSnakeCase, this.tableNameSnakeCase);

    return query(sql);
  }
}
