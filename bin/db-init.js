import { User } from '../models/user';

const force = true;

export const init = () => {
  return User.sync({ force }).then(function () {
    return User.create({
      firstName: 'RoN',
      lastName: 'CoH',
      email: 'r@n.coh',
      age: 22,
    });
  });
};
