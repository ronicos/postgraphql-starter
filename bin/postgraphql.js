import postgraphql from 'postgraphql'

const config = {
  user: 'authenticator', //env var: PGUSER
  database: 'favz', //env var: PGDATABASE
  password: 'As121212', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
};

const schemaName = 'demo';

const options = {
  graphiql: true,
  graphqlRoute: '/graphql',
  graphiqlRoute: '/graphiql',
  jwtSecret: 'secret',
  pgDefaultRole: 'anonymous',
  watchPg: true, // re-create graphql schema when db schema changes,
  // jwtPgTypeIdentifier: 'favz_public.jwt_claims',
  disableQueryLog: false,
  enableCors: true,
};

export const pgqlMiddleware = postgraphql(config, schemaName, options);
