import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-schema';
import config from '../../config/config.json';
import userConfig from './user-config.json';

const options = {
  freezeTableName: true,
  schema: config.postgresPublicSchemaName
};

export class UserRepository {
  constructor() {
    this.User = sequelize.define(userConfig.tableName, schema, options);
  }

  findById(_id) {
    return this.User.findOne({ where: { _id } })
  }

  create(_id) {
    return this.User.create({ _id }).then((res) => res.dataValues);
  }
}
