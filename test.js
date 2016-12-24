require('babel-register');

const init = require('./bin/db/db').init;

init().then((res) => {
  console.log('res', res);
}).catch((err) => {
  console.log('err', err);
});

