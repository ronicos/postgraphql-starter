var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var {postgraphql} = require('postgraphql');
var cors = require('cors');

const { jwt } = require('./middlewares/jwt');

var app                      = express();
var { schema }               = require('./graphql/custom-schema');
const graphqlHTTP            = require('express-graphql');
const { introspectionQuery } = require('graphql/utilities');
const { graphql }            = require('graphql');
const fs                     = require('fs');

const { secret, postgresPublicSchemaName, host, port, db, auth } = require('./config/config.json');
const { user, password } = auth;

const config = {
  user,
  database: db,
  password,
  host,
  port,
};

const options = {
  classicIds: true,
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
app.use(cors());
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
