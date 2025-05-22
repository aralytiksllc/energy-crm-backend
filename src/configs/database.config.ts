import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

const config: DatabaseConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'tt-core-flow',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres'
};

export default {
  development: config,
  test: config,
  production: config
}; 