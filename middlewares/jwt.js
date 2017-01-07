import { verify } from 'jsonwebtoken';
import { secret } from '../config/config.json';

const jwt = (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || (req.headers['authorization'] && req.headers['authorization'].length && req.headers['authorization'].split(' ')[1]);

    if (token) {

      return verify(token, secret, (err, decoded) => {
        if (err) {
          console.error('decoding err', err);

          return res.status(401)
            .json({ message: 'Failed to authenticate token.' });
        }

        console.log('token verified');

        req.user = decoded;

        next();
      });
    }

    next();
  }
  catch(e) {
    console.error('e', e);

    done();
  }
};

export { jwt };
