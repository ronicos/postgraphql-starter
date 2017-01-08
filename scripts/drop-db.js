require('babel-register');

const { drop } = require('../infrastructure/db-generator');

drop();
