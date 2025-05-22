import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import databaseConfig from '../configs/database.config';

config();

const { database, username, password, host, port, dialect } = databaseConfig;

// Create a temporary connection without specifying a database
const sequelize = new Sequelize({
  dialect,
  host,
  port,
  username,
  password,
  database: 'postgres', // Connect to default postgres database
  logging: false,
});

async function createDatabase() {
  try {
    // Check if database exists
    const [results] = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${database}'`,
    );

    if (Array.isArray(results) && results.length === 0) {
      // Database doesn't exist, create it
      await sequelize.query(`CREATE DATABASE "${database}";`);
      console.log(`Database "${database}" created successfully.`);
    } else {
      console.log(`Database "${database}" already exists.`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Execute if this script is run directly
if (require.main === module) {
  createDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { createDatabase }; 