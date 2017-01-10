require('babel-register');

const { dbGenerator } = require('../infrastructure/db-generator');

dbGenerator.drop();
