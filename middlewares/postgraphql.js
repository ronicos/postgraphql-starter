import postgraphql from 'postgraphql'
import { secret, postgresPublicSchemaName } from '../config/config.json';
import _ from 'lodash';

const pgqlMiddleware = (schema) => (req, res, next) => {

  if (schema) {
    const originalEnd = res.originalEnd = res.end;

    res.end = (resData) => {
      try {
        const json            = JSON.parse(resData);
        const { data }        = json;
        const isSchemaRequest = data && data.__schema && data.__schema.queryType;

        if (isSchemaRequest) {
          const mergedSchema = _.merge(json, schema);

          res.originalEnd(JSON.stringify(mergedSchema));
        }
        else {
          res.originalEnd(resData);
        }
      }
      catch (e) {
        // console.log('e', e);
        res.originalEnd(resData);
      }
    };
  }

  postgraphql(config, postgresPublicSchemaName, options)(req, res, next);
};

export { pgqlMiddleware };
