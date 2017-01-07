import Sequelize from 'sequelize';
import fs from 'fs';
import { query, connect, initTable } from '../helpers/pg-helper';

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

export const init = (config) => {
  const { db } = config;

  return connect(config)
    .then((client) => {
      return query(client, `create schema if not exists ${config.db};`)
        .then((res) => {
          return initSequelize(config)
            .then((sequelize) => {
              const { userSchema } = require('../models/user/user-schema');
              const populateData   = require('../models/user/user-pre-defined-data.json');
              const name           = 'user';
              const options        = {
                freezeTableName: true,
                schema: config.publicSchema
              };
              const rules          = fs.readFileSync(__dirname + '/../models/user/user-access-rules.sql', "utf-8");
              const revoke         = fs.readFileSync(__dirname + '/../models/user/user-access-rules-revoke.sql', "utf-8");

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

              console.log('config.schema', config.postgresPublicSchemaName);

              initTable(sequelize, client, tableData, config.postgresPublicSchemaName)
                .catch((err) => console.error('err', err))
                .then(() => {
                  console.log('done');
                });
            });
        });
    });
};
