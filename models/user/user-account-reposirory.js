import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-schema';

const options        = {
  freezeTableName: true,
  schema: 'demo'
};

export class UserAccountRepository {
  constructor() {
    this.User = sequelize.define('user', schema, options);
  }

  create() {
    return this.User.create();
  }
}
