import { sequelize } from '../../helpers/sequelize';
import { schema } from './user-schema';
import { sign } from 'jsonwebtoken';
import config from '../../config/config.json';

const options        = {
  freezeTableName: true,
  schema: 'demo'
};

class UserRepository {
  constructor() {
    this.User = sequelize.define('user', schema, options);
  }

  login(email, password) {
    return this.User.findAll({
      where: {
        email: email
      }
    }).then((users) => {

      if (!users.length) {
        return '';
      }

      const user = users[0];
      const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 60);
      const payload = {
        role: user.role,
        exp: expiresIn
      };
      const options = {
        audience: 'postgraphql'
      };
      const token = sign(payload, config.secret, options);

      return token;
    })
  }
}

export const userRepository = new UserRepository();
