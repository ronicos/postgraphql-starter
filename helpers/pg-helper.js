import pg from 'pg';

import { format } from '../infrastructure/extentions';

const resolveConnectionString = (config) => {
  const { user, password }     = config.owner;
  const { host, db }           = config;
  const connectionString       = `postgres://${user}:${password}@${host}/${db}`;

  return connectionString;
};

const query = (client, query) => {
  return new Promise((resolve, reject) => {
    client.query(query, function (err, res) {

      if (err) {
        return reject(err);
      }

      resolve(res);
    });
  });
};

const dropDB = (client, dbName) => {
  const dropQuery = 'DROP DATABASE if exists {0}';
  const dropDB    = format(dropQuery, dbName);

  return query(client, dropDB);
};

const createDB = (client, dbName) => {
  const createQuery = 'CREATE DATABASE {0}';
  const createDB    = format(createQuery, dbName);

  return query(client, createDB);
};

const connect = (config) => {
  const connectionString = resolveConnectionString(config);

  return new Promise((resolve, reject) => {
    pg.connect(connectionString, function (err, client, done) {
      if (err) {
        reject(err);
      }

      resolve(client);
    });
  });
};

const initTable = (sequelize, client, tableData, pgSchema) => {
  const { name, schema, options, populateData, rules, revoke } = tableData;

  const model = sequelize.define(name, schema, options);
  return query(client, revoke)
    .then(() => {
      return model.schema(pgSchema).sync();
    })
    .catch((err) => {
      return model.schema(pgSchema).sync();
    })
    .then(() => {
      return Promise.all(populateData.map((populateItem) => model.schema(pgSchema).create(populateItem)));
    })
    .then(() => {
      return query(client, rules);
    });
};

export {
  query,
  dropDB,
  createDB,
  connect,
  resolveConnectionString,
  initTable
}
