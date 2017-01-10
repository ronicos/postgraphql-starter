require('babel-register');

const { userService } = require('../models/user/user-service');
const { dbGenerator } = require('../infrastructure/db-generator/db-generator');

userService.register('', "r@n.comco3", 'As1212121')
  .then((res) => console.log('res', res));
