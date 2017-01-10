import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-schema';
import config from '../../config/config.json';
import userConfig from './user-config.json';

const options = {
  freezeTableName: true,
  schema: config.postgresPublicSchemaName + '_private'
};

export class UserAccountRepository {
  constructor() {
    this.User = sequelize.define(userConfig.tableName + '_account', schema, options);
  }

  create() {
    return this.User.create();
  }
}
