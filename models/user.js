import Sequelize from 'sequelize';
import { sequelize } from '../bin/sequelize';

export const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
}, {
  classMethods: {
    generateToken: function () {
    }
  },
  instanceMethods: {
    getFullName: function () {
      return [this.firstName, this.lastName].join(' ');
    }
  },
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
  ]
});
