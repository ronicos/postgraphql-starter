import pg from 'pg';

import { format } from '../infrastructure/extentions';
import config from '../config/config.json';

let client            = null;
let connectionPromise = null;

const resolveConnectionString = (config) => {
  const { user, password }     = config.auth;
  const { host, db }           = config;
  const connectionString       = `postgres://${user}:${password}@${host}/${db}`;

  return connectionString;
};

const query = (query) => {
  const createPromise = () => new Promise((resolve, reject) => {
    console.log('executing: ', query);
    client.query(query, function (err, res) {

      if (err) {
        console.log('err', err);

        return reject(err);
      }

      console.log('success');
      resolve(res);
    });
  });

  return connectionPromise ? connectionPromise.then(createPromise) : createPromise();
};

const dropDB = (dbName) => {
  const dropQuery = 'DROP DATABASE if exists {0}';
  const dropDB    = format(dropQuery, dbName);

  return query(client, dropDB);
};

const createDB = (dbName) => {
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

connectionPromise = connect(config).then((_client) => {
  client            = _client;
  connectionPromise = null;
});

export {
  query,
  dropDB,
  createDB,
  connect,
  resolveConnectionString
}
