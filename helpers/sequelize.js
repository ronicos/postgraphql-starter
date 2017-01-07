import Sequelize from 'sequelize';

import config from '../config/config.json';

const initSequelize = (config) => {
  const { user, password } = config.auth;
  const { host, db }       = config;

  return new Sequelize(db, user, password, {
    host,
    dialect: 'postgres',

    pool: {},
  });
};

const sequelize = initSequelize(config);

export {
  sequelize
};
