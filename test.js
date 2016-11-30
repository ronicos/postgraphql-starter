require('babel-register');
const seq = require('./bin/sequelize').sequelize;

const init = require('./bin/db-init').init;

init().then((user) => {
  console.log('user.getFullName()', user.getFullName());

  seq.showAllSchemas().then((res) => console.log('res', res));
});

