// This file is a bridge between Sequelize CLI and our TypeScript config
require('ts-node/register');
require('tsconfig-paths/register');

// Export the TypeScript config
module.exports = require('./src/configs/sequelize.config.ts').default; 