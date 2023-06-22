const client = require('./client').default;
const models = require('./models');

module.exports = {
  client,
  ...models,
};