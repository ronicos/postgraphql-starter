import { sign } from 'jsonwebtoken';

import { encrypt, isMatch } from '../../infrastructure/crypto';
import config from '../../config/config.json';
import { UserRepository } from './user-reposirory';
import { UserAccountRepository } from '../user-account/user-account-reposirory';

class UserService {
  constructor() {
    this.repository        = new UserRepository();
    this.accountRepository = new UserAccountRepository();
  }

  login(email, password) {
    return this.accountRepository.findOne(email)
      .then((user) => {

        if (!user) {
          throw new Error('Email does not exists in the system');
        }

        if (!isMatch(password, user.password)) {
          throw new Error('Wrong password');
        }

        return this.makeToken(user);
      });
  }

  register(phone, email, password) {

    return this.accountRepository.findOne(email, password)
      .then((user) => {
        if (user) {
          throw new Error('User already exists')
        }

        const encryptedPassword = encrypt(password);

        return this.accountRepository.create(phone, email, encryptedPassword, 'active_user')
          .then((userAccount) => this.repository.create(userAccount._id))
          .then((user) => this.makeToken(user));
      });
  }

  makeToken(user) {
    const exp           = Math.floor(Date.now() / 1000) + (60 * 60);
    const { _id, role } = user;
    const audience      = 'postgraphql';
    const payload       = { _id, role, exp };
    const options       = { audience };
    const token         = sign(payload, config.secret, options);

    return token;
  }
}

export const userService = new UserService();
