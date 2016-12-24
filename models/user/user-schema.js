import Sequelize from 'sequelize';
import config from '../../config/config.json';

const userSchema = {
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

export { userSchema };
