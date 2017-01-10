import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-schema';
import config from '../../config/config.json';

const options = {
  freezeTableName: true,
  schema: config.postgresPublicSchemaName + '_private'
};

export class UserAccountRepository {
  constructor() {
    this.User = sequelize.define('user_account', schema, options);
  }

  create() {
    return this.User.create();
  }
}
