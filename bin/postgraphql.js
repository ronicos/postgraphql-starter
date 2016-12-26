import postgraphql from 'postgraphql'
import { secret, publicSchema } from '../config/config.json';
import { graphql } from 'graphql';

const config = {
  user: 'authenticator', //env var: PGUSER
  database: 'favz', //env var: PGDATABASE
  password: 'As121212', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
};

const options = {
  graphiql: true,
  graphqlRoute: '/graphql-postgres',
  graphiqlRoute: '/graphiql-postgres',
  jwtSecret: secret,
  pgDefaultRole: 'anonymous',
  watchPg: true, // re-create graphql schema when db schema changes,
  // jwtPgTypeIdentifier: 'favz_public.jwt_claims',
  disableQueryLog: false,
  enableCors: true,
};

const pgqlMiddleware = (schema) => (req, res, next) => {

  if (schema) {
    const originalEnd = res.originalEnd = res.end;

    res.end = (resData) => {
      try {
        const json            = JSON.parse(resData);
        const { data }        = json;
        const isSchemaRequest = data && data.__schema && data.__schema.queryType;

        if (isSchemaRequest) {
          graphql(schema).then((r) => {
            res.originalEnd(JSON.stringify(r));
          });
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

  postgraphql(config, publicSchema, options)(req, res, next);
};

export { pgqlMiddleware };
