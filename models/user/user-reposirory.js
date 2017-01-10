import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-schema';
import config from '../../config/config.json';

const options = {
  freezeTableName: true,
  schema: config.postgresPublicSchemaName
};

export class UserRepository {
  constructor() {
    this.User = sequelize.define('user', schema, options);
  }

  findOne(email, password) {
    return this.User.findOne({
      where: {
        email: email
      }
    })
  }

  create(phone, email, password) {
    return this.User.create({ phone, email, password });
  }
}
