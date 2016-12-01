require('babel-register');

const init = require('./bin/db-init').init;

init().then((user) => {
  console.log('user.getFullName()', user.getFullName());

});

