require('babel-register');

const { init } = require('./infrastructure/db-generator');
const jwt = require('jsonwebtoken');
const config = require('./config/config.json');

const initDb = () => {
  init(config).then((res) => {
    console.log('res', res);
  }).catch((err) => {
    console.log('err', err);
  });
};

const generateToken = () => {
  const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 60);
  const payload = {
    role: 'active_user',
    exp: expiresIn
  };
  const options = {
    audience: 'postgraphql'
  };

  console.log('signing: ', payload);
  console.log('secret: ', config.secret);

  const token = jwt.sign(payload, config.secret, options);

  console.log('token', token);
};


initDb();
