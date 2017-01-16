require('babel-register');

const { userAccountService } = require('../models/user-account/user-account-service');
const { dbGenerator } = require('../infrastructure/db-generator/db-generator');

userAccountService.register('', "r@n.comco3", 'As1212121')
  .then((res) => console.log('res', res));
