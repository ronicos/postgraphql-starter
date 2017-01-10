import fs from 'fs';
import path from 'path';

import { query } from '../../helpers/pg-helper';
import config from '../../config/config.json';
import { TableGenerator } from './table-generator';
import { AbstractGenerator } from './abstract-generator';

class DatabaseGenerator extends AbstractGenerator {
  constructor(schemaName) {
    super(schemaName);

    this.tableNames = this.findTables();
  }

  findTables() {
    const srcpath = __dirname + '/../../models';

    return fs.readdirSync(srcpath).filter(function(file) {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
  }

  create() {
    const sql = super.loadQuery('db-generator.sql', this.schema);

    const promise = Promise.all(this.tableNames.map((tableName) => {
      const table = new TableGenerator(tableName, this.schema, true);

      return table.create();
    }));

    return query(sql).then(promise);
  }

  drop() {
    const sql = this.loadQuery('db-generator-drop.sql', this.schema);

    const promise = Promise.all(this.tableNames.map((tableName) => {
      const table = new TableGenerator(tableName, this.schema, true);

      return table.drop();
    }));

    return promise.then((res) => query(sql));
  }
}

export const dbGenerator = new DatabaseGenerator(config.postgresPublicSchemaName);
