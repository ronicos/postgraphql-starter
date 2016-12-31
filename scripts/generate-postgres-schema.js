require('babel-register');

const { resolveConnectionString } = require('../bin/db/db');
const config                      = require('../config/config.json');
const { postgraphql }             = require('postgraphql');
const { introspectionQuery }      = require('graphql/utilities');
const http                        = require('http');
const fs                          = require('fs');
const request                     = require('request');

const connectionString = resolveConnectionString(config);
const options          = {
  uri: 'http://localhost:3000/graphql',
  json: {
    query: introspectionQuery
  }
};

const server = http.createServer(postgraphql(connectionString));

server.listen(3000);
server.on('error', (err) => console.log('err', err));
server.on('listening', () => {

  request.post(options, (error, response, body) => {

      if (error) {
        console.log('error', error);
      }

      if (!error && response.statusCode == 200) {
        fs.writeFileSync('./data/postgres-schema.json', JSON.stringify(body, null, 2));

        console.log('done');
      }
    }
  );
});
