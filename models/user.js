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
    validate: {
      isUnique: function (email, done) {
        User.find({ where: { email }})
          .done(function (err, user) {
            if (err) {
              done(err);
            }

            if (user) {
              done(new Error('email already exists'));
            }

            done();
          });
      }
    }
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
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
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
  }
});
