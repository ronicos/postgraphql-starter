import { format } from '../extentions';
import { sequelize } from '../../helpers/sequelize';
import { query } from '../../helpers/pg-helper';
import { AbstractGenerator } from './abstract-generator';

export class TableGenerator extends AbstractGenerator {
  constructor(tableName, schemaName, freezeTableName) {
    super(schemaName);

    this.tableName       = tableName;
    this.freezeTableName = freezeTableName;
  }

  get rootPath() {
    return format(`../../models/{0}/`, this.tableName);
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
    const model      = sequelize.define(this.tableName, schema, this);
    const sql        = this.loadQuery(this.accessRulesFile);

    return model.schema(this.schema).sync().then(() => query(sql));
  };

  drop() {
    const sql = super.loadQuery(this.accessRulesRevokeFile);

    return query(sql)
  }
}
