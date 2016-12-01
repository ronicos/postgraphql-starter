import pg from 'pg';
import Sequelize from 'sequelize';

const user             = 'postgres', password = 'As121212', host = 'localhost', db = 'favz';
const connectionString = `postgres://${user}:${password}@${host}/postgres`;

const createDB = (dbName) => {
  return new Promise((resolve, reject) => {

    pg.connect(connectionString, function (err, client, done) {
      client.query('DROP DATABASE if exists ' + dbName, function (err) {

        if (err) {
          return reject(err);
        }

        client.query('CREATE DATABASE ' + dbName, function (err) {

          if (err) {
            return reject(err);
          }

          resolve();
        });
      });
    });

  });
};

const initRoles = () => {
  const createAdminQuery = `
  DROP role if exists admin1;

CREATE role admin1 WITH
  LOGIN
  PASSWORD '${password}'
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION;`;

  const sequelize = new Sequelize(db, user, password, {
    host,
    dialect: 'postgres',

    pool: {},

  });

  return sequelize.query(createAdminQuery);
};

export const initTables = () => {
  const force = true;
  const { User } = require('../models/user');

  return User.sync().then(function () {
    return User.create({
      firstName: 'RoN',
      lastName: 'CoH',
      email: 'r@n.coh',
      age: 22,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
};

export const init = () => createDB(db).then(() => initRoles()).then(initTables);
