// Enable TypeScript support for loading the config
require('ts-node/register');

// Export the TypeScript config
module.exports = require('./src/configs/sequelize.config.ts').default; 