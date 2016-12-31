require('babel-register');

const init = require('./bin/db/db').init;
const jwt = require('jsonwebtoken');
const config = require('./config/config.json');

init().then((res) => {
  console.log('res', res);
}).catch((err) => {
  console.log('err', err);
});
