import Sequelize from 'sequelize';

// by convention
const schema = {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
};

export { schema };
