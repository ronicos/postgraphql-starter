import pg from 'pg';
import Sequelize from 'sequelize';
import { format } from '../extentions';
import queries from './queries.json';
import config from '../../config/config.json';
import fs from 'fs';

const query = (client, query) => {
  return new Promise((resolve, reject) => {
    client.query(query, function (err) {

      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

const connect = () => {
  const { user, password } = config.owner;
  const { host }           = config;
  const connectionString   = `postgres://${user}:${password}@${host}/postgres`;

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

const initSequelize = () => {
  const { user, password } = config.owner;
  const { host, db }       = config;

  return new Sequelize(db, user, password, {
    host,
    dialect: 'postgres',

    pool: {},
  });
};

const createFunctions = (client) => {
  var sql = fs.readFileSync(__dirname + '/auth.sql').toString();

  return query(client, sql);
};

const initRoles = (sequelize) => {
  const promises = [];

  for (const role in config.roles) {
    const query = format(queries.createRole, role, config.roles[role]);

    promises.push(sequelize.query(query));
  }

  return Promise.all(promises);
};

const createExtentions = (sequelize) => {
  const query = queries.pgcrypto;

  return sequelize.query(query);
};

export const initTables = () => {
  const { User } = require('../../models/user');

  return User.sync().then(function () {
    return User.create({
      firstName: 'RoN',
      lastName: 'CoH',
      email: 'r@n.coh',
      age: 22,
      active: true,
      role: 'user',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
};

export const init = () => {
  const { db } = config;

  return connect()
    .then((client) => {
      return initSequelize()
        .then((sequelize) => {
            initTables().catch(() => {})
            .then(() => createExtentions(sequelize))
            .then(() => createFunctions(sequelize));
        });
    });
};
