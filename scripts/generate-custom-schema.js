#!/usr/bin/env babel-node --optional es7.asyncFunctions
require('babel-register');

const fs = require('fs');
const path = require('path');
const { schema } = require('../infrastructure/graphql-schema');
const { graphql }  = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(schema, introspectionQuery).then((result) => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../data/custom-schema.json'),
      JSON.stringify(result, null, 2)
    );

    console.log('done');
  }
});

