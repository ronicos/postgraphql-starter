import { sign } from 'jsonwebtoken';
import config from '../../config/config.json';
import { UserRepository } from './user-reposirory';
import { UserAccountRepository } from '../user-account/user-account-reposirory';

class UserService {
  constructor() {
    this.repository = new UserRepository();
    this.accountRepository = new UserAccountRepository();
  }

  login(email, password) {
    return this.repository.findOne(email, password)
      .then((user) => {
        const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 60);
        const payload   = {
          _id: user._id,
          role: user.role,
          exp: expiresIn
        };
        const options   = {
          audience: 'postgraphql'
        };
        const token     = sign(payload, config.secret, options);

        return token;
      })
  }

  register(phone, email, password) {
    return this.accountRepository.create(phone, email, password, 'active_user')
      .then((userAccount) => this.repository.create(userAccount._id));
  }
}

export const userService = new UserService();
