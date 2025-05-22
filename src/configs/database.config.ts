import { config } from 'dotenv';

// Load environment variables
config();

// Database configuration 
export const databaseConfig = {
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  schema: process.env.DB_SCHEMA!,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
}; 