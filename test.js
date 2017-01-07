require('babel-register');

const { create, drop } = require('./infrastructure/db-generator');
const jwt = require('jsonwebtoken');

const createDb = () => {
  create().then((res) => {
    console.log('res', res);
  }).catch((err) => {
    console.log('err', err);
  });
};

const dropDb = () => {
  drop().then((res) => {
    console.log('res', res);
  }).catch((err) => {
    console.log('err', err);
  });
};

const generateTokeזn = () => {
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

createDb();
