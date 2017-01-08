require('babel-register');

const { create } = require('../infrastructure/db-generator');

create();
