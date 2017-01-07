import fs from 'fs';

import { query } from '../helpers/pg-helper';
import config from '../config/config.json';
import { format } from './extentions';
import { sequelize } from '../helpers/sequelize';

const tableNames = ['user'];

const createTable = (tableName, postgresPublicSchemaName) => {
  const path           = `../models/${tableName}`;
  const { schema }     = require(`${path}/${tableName}-schema`);
  const populateData   = require(`${path}/${tableName}-pre-defined-data.json`);
  const options        = {
    freezeTableName: true,
    schema: postgresPublicSchemaName
  };
  const rules          = fs.readFileSync(__dirname + `/${path}/${tableName}-access-rules.sql`, "utf-8");
  const model          = sequelize.define(tableName, schema, options);
  const formattedRules = format(rules, postgresPublicSchemaName, tableName);

  return model.schema(postgresPublicSchemaName).sync()
    .then(() => {
      return Promise.all(populateData.map((populateItem) => model.schema(postgresPublicSchemaName)
        .create(populateItem)));
    })
    .then(() => {
      return query(formattedRules);
    });
};

const dropTable = (tableName, postgresPublicSchemaName) => {
  const revokeSql    = fs.readFileSync(__dirname + `/../models/${tableName}/${tableName}-access-rules-revoke.sql`, "utf-8");
  const formattedSql = format(revokeSql, postgresPublicSchemaName, tableName);

  return query(formattedSql)
};

export const create = () => {
  const { postgresPublicSchemaName } = config;
  const sql                          = fs.readFileSync(__dirname + '/db-generator.sql', "utf-8");
  const formatted                    = format(sql, postgresPublicSchemaName);

  const promise = Promise.all(tableNames.map((tableName) => createTable(tableName, postgresPublicSchemaName)));

  return query(formatted).then(promise);
};

export const drop = () => {
  const { postgresPublicSchemaName } = config;
  const sql                          = fs.readFileSync(__dirname + '/db-generator-drop.sql', "utf-8");
  const preTableDropSql              = fs.readFileSync(__dirname + '/db-generator-pre-table-drop.sql', "utf-8");
  const postTableDropSql             = fs.readFileSync(__dirname + '/db-generator-post-table-drop.sql', "utf-8");
  const formatted                    = format(sql, postgresPublicSchemaName);

  const promise = Promise.all(tableNames.map((tableName) => {
    return query(preTableDropSql)
      .then(() => dropTable(tableName, postgresPublicSchemaName))
      .then(() => query(postTableDropSql));
  }));

  return promise.then((res) => query(formatted));
};
