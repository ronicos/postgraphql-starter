import fs from 'fs';

import { query } from '../../helpers/pg-helper';
import { format } from './../../infrastructure/extentions';
import { sequelize } from '../../helpers/sequelize';

export const createUserTable = (postgresPublicSchemaName) => {
  const { schema } = require('./user-schema');
  const populateData = require('./user-pre-defined-data.json');
  const tableName = 'user';
  const options = {
    freezeTableName: true,
    schema: postgresPublicSchemaName
  };
  const rules = fs.readFileSync(__dirname + '/user-access-rules.sql', "utf-8");
  const model = sequelize.define(tableName, schema, options);
  const formattedRules = format(rules, postgresPublicSchemaName, tableName)

  return model.schema(postgresPublicSchemaName).sync()
    .then(() => {
      return Promise.all(populateData.map((populateItem) => model.schema(postgresPublicSchemaName)
        .create(populateItem)));
    })
    .then(() => {
      return query(formattedRules);
    });
};

export const dropUserTable = (postgresPublicSchemaName) => {
  const revokeSql    = fs.readFileSync(__dirname + '/user-access-rules-revoke.sql', "utf-8");
  const formattedSql = format(revokeSql, postgresPublicSchemaName, 'user');

  return query(formattedSql)
};
