require('babel-register');

const fs = require('fs');
const path = require('path');

const postgresSchema = require('../data/postgres-schema.json');
const customSchema = require('../data/custom-schema.json');

const {createCompositeSchema} = require('relay-composite-network-layer/lib/merge');

const { schema, config } = createCompositeSchema({
  custom: customSchema,
  public: postgresSchema
}, {
  queryType: 'Query',
  mutationType: 'Mutation'
});

fs.writeFileSync(
  path.join(__dirname, '../data/', 'schema.json'),
  JSON.stringify(schema, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '../data/', 'config.json'),
  JSON.stringify(config, null, 2)
);
