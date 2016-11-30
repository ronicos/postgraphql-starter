import postgraphql from 'postgraphql'

const config = {
  user: 'postgres', //env var: PGUSER
  database: 'favz', //env var: PGDATABASE
  password: 'As121212', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
};

const schemaName = 'public';

const options = {
  graphiql: true
};

export const pgqlMiddleware = postgraphql(config, schemaName, options);
