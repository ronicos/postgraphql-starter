import { query } from '../../helpers/pg-helper';
import config from '../../config/config.json';
import { TableGenerator } from './table-generator';
import { AbstractGenerator } from './abstract-generator';
import { format } from '../extentions';

class DatabaseGenerator extends AbstractGenerator {
  constructor(schemaName) {
    super(schemaName);

    this.tableNames = ['user'];
  }

  create() {
    const sql = super.loadQuery('db-generator.sql');

    const promise = Promise.all(this.tableNames.map((tableName) => {
      const table = new TableGenerator(tableName, this.schema, true);

      return table.create();
    }));

    return query(sql).then(promise);
  }

  drop() {
    const sql              = this.loadQuery('db-generator-drop.sql');
    const preTableDropSql  = this.loadQuery('db-generator-pre-table-drop.sql');
    const postTableDropSql = this.loadQuery('db-generator-post-table-drop.sql');

    const promise = Promise.all(this.tableNames.map((tableName) => {
      return query(format(preTableDropSql, this.schema, tableName))
        .then(() => {
          const table = new TableGenerator(tableName, this.schema, true);

          table.drop();
        })
        .then(() => query(format(postTableDropSql, this.schema, tableName)));
    }));

    return promise.then((res) => query(formatted));
  }
}

export const dbGenerator = new DatabaseGenerator(config.postgresPublicSchemaName);
