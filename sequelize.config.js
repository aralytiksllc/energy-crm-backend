require('ts-node/register');

const { Sequelize } = require('sequelize');
const config = require('./src/configs/database.config.ts');

async function createDatabaseIfNotExists() {
  const { database, username, password, host, port, dialect } = config;

  // Create a temporary connection to default postgres database
  const tempSequelize = new Sequelize({
    dialect,
    host,
    port,
    username,
    password,
    database: 'postgres',
    logging: false,
  });

  try {
    // Check if database exists
    const [results] = await tempSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${database}'`
    );

    if (Array.isArray(results) && results.length === 0) {
      // Database doesn't exist, create it
      await tempSequelize.query(`CREATE DATABASE "${database}";`);
      console.log(`Database "${database}" created successfully.`);
    }
  } catch (error) {
    console.error('Error checking/creating database:', error);
    throw error;
  } finally {
    await tempSequelize.close();
  }
}

// Create database if it doesn't exist before returning config
createDatabaseIfNotExists();

module.exports = config; 