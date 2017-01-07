import Sequelize from 'sequelize';

const sequelize = new Sequelize('favz', 'authenticator', 'As121212', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    schema: 'demo'
  },
  pool: {},

});

sequelize.sync();

export {
  sequelize
};
