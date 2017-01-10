import Sequelize from 'sequelize';

// by convention
const schema = {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
};

export { schema };
