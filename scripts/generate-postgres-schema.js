require('babel-register');

const config                      = require('../config/config.json');
const { postgraphql }             = require('postgraphql');
const { introspectionQuery }      = require('graphql/utilities');
const http                        = require('http');
const fs                          = require('fs');
const request                     = require('request');
const path                        = require('path');
const fetch                       = require('isomorphic-fetch');
const fsp                         = require('fs-promise');

// introspect the schema from the graphql endpoint
const fetchSchema = url => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ query: introspectionQuery }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.text())
};

fetchSchema(`http://localhost:${3000}/graphql-postgres`).then(json => {
  return fsp.writeFile(
    path.join(__dirname, '../data/postgres-schema.json'),
    json
  )
})
  .then(() => console.log('The schema.json file was successfully created'))
  .catch(err => console.log(`There was an error fetching the GraphQL schema. ${err}`));
