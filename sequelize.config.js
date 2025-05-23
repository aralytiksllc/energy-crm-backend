require('ts-node/register');
require('dotenv').config();

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: 'postgres',
  schema: process.env.DB_SCHEMA,
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize'
};

module.exports = {
  development: config,
  test: config,
  production: config
};
