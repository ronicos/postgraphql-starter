import { sign, verify } from 'jsonwebtoken';

import { encrypt, isMatch } from '../../infrastructure/crypto';
import config from '../../config/config.json';
import { UserRepository } from '../user/user-reposirory';
import { UserAccountRepository } from './user-account-reposirory';

class UserAccountService {
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

        return this.makeToken(user, 60);
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
          .then(() => this.login(email, password));
      });
  }

  requestPasswordReset(email) {
    return this.accountRepository.findOne(email)
      .then((user) => {

        if (!user) {
          throw new Error('Email does not exists in the system');
        }

        return this.makeToken(user, 5);
      });
  }

  resetPassword(email, newPassword, token) {
    return this.verifyToken(token).then(() => {
      const password = encrypt(newPassword);

      return this.accountRepository.findByEmailAndUpdate(email, { password });
    });
  }

  makeToken(user, minutes) {
    const exp           = Math.floor(Date.now() / 1000) + (minutes * 60);
    const { _id, role } = user;
    const audience      = 'postgraphql';
    const payload       = { _id, role, exp };
    const options       = { audience };
    const token         = sign(payload, config.secret, options);

    return token;
  }

  verifyUser() {
    const verified = true;

    return this.accountRepository.findByEmailAndUpdate(email, { verified });
  }

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      verify(token, config.secret, (err) => {
        if (err) {
          reject(new Error('Invalid token'));
        }

        resolve(true);
      });
    });
  }
}

export const userAccountService = new UserAccountService();
