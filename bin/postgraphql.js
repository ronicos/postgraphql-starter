import postgraphql from 'postgraphql'

const config = {
  user: 'admin1', //env var: PGUSER
  database: 'favz', //env var: PGDATABASE
  password: 'As121212', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
};

const schemaName = 'public';

const options = {
  graphiql: true,
  jwtSecret: 'some secret',
  watchPg: true // re-create graphql schema when db schema changes
};

export const pgqlMiddleware = postgraphql(config, schemaName, options);
