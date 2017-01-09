import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-schema';

const options        = {
  freezeTableName: true,
  schema: 'demo'
};

export class UserRepository {
  constructor() {
    this.User = sequelize.define('user', schema, options);
  }

  findOne(email, password) {
    // replace findAll to finedOne
    return this.User.findOne({
      where: {
        email: email
      }
    }).then((users) => {

      if (!users.length) {
        return null;
      }

      return users[0];
    })
  }

  create(phone, email, password) {
    return this.User.create({ phone, email, password });
  }
}
