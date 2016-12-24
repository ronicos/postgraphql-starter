require('babel-register');

const init = require('./bin/db/db').init;
const jwt = require('jsonwebtoken');
const config = require('./config/config.json');

// init().then((res) => {
//   console.log('res', res);
// }).catch((err) => {
//   console.log('err', err);
// });

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

// active-user: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWN0aXZlX3VzZXIiLCJleHAiOjE0ODI4MTc2ODAsImlhdCI6MTQ4MjYwMTY4MCwiYXVkIjoicG9zdGdyYXBocWwifQ.L_J2EAeCtzP6xN4TRnycQZHy7NkoKDmIlRJn_li5PDM
