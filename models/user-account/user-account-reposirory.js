import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-account-schema';
import config from '../../config/config.json';
import userConfig from './user-account-config.json';

const options = {
  freezeTableName: true,
  schema: config.postgresPublicSchemaName + '_private'
};

export class UserAccountRepository {
  constructor() {
    this.User = sequelize.define(userConfig.tableName, schema, options);
  }

  findOne(email, password) {
    return this.User.findOne({ where: { email } })
  }

  create(phone, email, password, role) {
    return this.User.create({ phone, email, password, role })
      .then((res) => res.dataValues);
  }
}
