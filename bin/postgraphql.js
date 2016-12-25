import postgraphql from 'postgraphql'
import { secret, publicSchema } from '../config/config.json';

const config = {
  user: 'authenticator', //env var: PGUSER
  database: 'favz', //env var: PGDATABASE
  password: 'As121212', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
};

const options = {
  graphiql: true,
  graphqlRoute: '/graphql',
  graphiqlRoute: '/graphiql',
  jwtSecret: secret,
  pgDefaultRole: 'anonymous',
  watchPg: true, // re-create graphql schema when db schema changes,
  // jwtPgTypeIdentifier: 'favz_public.jwt_claims',
  disableQueryLog: false,
  enableCors: true,
};

const pgqlMiddleware = (schema) => (req, res, next) => {

  res.originalEnd = res.end;

  res.end = (data) => {
    try {
      const json = JSON.parse(data);
      const { data } = json;
      const isSchemaRequest = data && data.__schema && data.__schema.queryType;

      if (isSchemaRequest) {
        // merge schemas
      }

      res.originalEnd(data);
    }
    catch(e) {
      // console.log('e', e);
      res.originalEnd(data);
    }
  };

  postgraphql(config, publicSchema, options)(req, res, next);
};

export { pgqlMiddleware };
