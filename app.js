require('babel-register');

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var {postgraphql} = require('postgraphql');

var index       = require('./routes/index');
var users       = require('./routes/users');

const { jwt } = require('./bin/jwt');

var app                      = express();
var { schema }               = require('./bin/graphql-schema');
const graphqlHTTP            = require('express-graphql');
const { introspectionQuery } = require('graphql/utilities');
const { graphql }            = require('graphql');
const fs                     = require('fs');

const { secret, postgresPublicSchemaName } = require('./config/config.json');

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
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt);

graphql(schema, introspectionQuery)
  .then((schemaObject) => {
    app.use(postgraphql(config, postgresPublicSchemaName, options));
    app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true
    }));

  });

// app.use('/', index);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
