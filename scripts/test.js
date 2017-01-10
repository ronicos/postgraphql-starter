require('babel-register');

const { userService } = require('../models/user/user-service');

userService.register('', "r@n.comco3", 'As1212121')
  .then((res) => console.log('res', res));
