import Sequelize from 'sequelize';

const sequelize = new Sequelize('favz', 'postgres', 'As121212', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {},

});

sequelize.sync();

export {
  sequelize
};
