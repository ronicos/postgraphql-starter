import Sequelize from 'sequelize';
import { sequelize } from '../bin/sequelize';

const schema = {
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
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null,
  },
  password: {
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
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
};
const methods = {
  classMethods: {
    generateToken: function () {
    }
  },
  instanceMethods: {
    getFullName: function () {
      return [this.firstName, this.lastName].join(' ');
    }
  }
};
const options = {
  freezeTableName: true // disable pluralization for table name.
};

export const User = sequelize.define('user', schema, options);
