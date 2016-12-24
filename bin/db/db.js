import pg from 'pg';
import Sequelize from 'sequelize';
import { format } from '../extentions';
import queries from './queries.json';
import config from '../../config/config.json';
import fs from 'fs';

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

const connect = (config) => {
  const { user, password }     = config.owner;
  const { host, db }           = config;
  const connectionString       = `postgres://${user}:${password}@${host}/${db}`;

  return new Promise((resolve, reject) => {
    pg.connect(connectionString, function (err, client, done) {
      if (err) {
        reject(err);
      }

      resolve(client);
    });
  });
};

const dropDB = (client, dbName) => {
  const dropDB = format(queries.dropDB, dbName);

  return query(client, dropDB);
};

const createDB = (client, dbName) => {
  const createDB = format(queries.createDB, dbName);

  return query(client, createDB);
};

const initSequelize = (config) => {
  const { user, password } = config.owner;
  const { host, db }       = config;

  const sequelize = new Sequelize(db, user, password, {
    host,
    dialect: 'postgres',

    pool: {},
  });

  return Promise.resolve(sequelize);
};

export const initTable = (sequelize, client, tableData) => {
  const { name, schema, options, populateData, rules, revoke } = tableData;

  const model = sequelize.define(name, schema, options);
  return query(client, revoke)
    .then(() => {
      return model.sync();
    })
    .then(() => {
      return Promise.all(populateData.map((populateItem) => model.create(populateItem)));
    })
    .then(() => {
      return query(client, rules);
    });
};

export const init = () => {
  const { db } = config;

  return connect(config)
    .then((client) => {
      return query(client, `create schema if not exists ${config.db};`)
        .then((res) => {
          return initSequelize(config)
            .then((sequelize) => {
              const { userSchema } = require('../../models/user/user-schema');
              const populateData   = require('../../models/user/user-pre-defined-data.json');
              const name           = 'user';
              const options        = {
                freezeTableName: true,
                schema: config.publicSchema
              };
              const rules          = fs.readFileSync(__dirname + '/../..//models/user/user-access-rules.sql', "utf-8");
              const revoke         = fs.readFileSync(__dirname + '/../..//models/user/user-access-rules-revoke.sql', "utf-8");

              // reset
              // const rules        = ';';
              // populateData.length = 0;

              const tableData = {
                name,
                schema: userSchema,
                options,
                populateData,
                rules,
                revoke
              };

              initTable(sequelize, client, tableData)
                .catch((err) => console.error('err', err))
                .then(() => {
                  console.log('done');
                });
            });
        });
    });
};
