import { Options, Dialect } from 'sequelize';
import { databaseConfig } from './database.config';

// Remove ssl from databaseConfig since it's not part of Sequelize options
const { ssl, ...databaseConfigWithoutSsl } = databaseConfig;

// Sequelize ORM configuration
export const sequelizeConfig: Options = {
  ...databaseConfigWithoutSsl,
  dialect: 'postgres' as Dialect,
  
  // Logging configuration
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  
  // Model configuration
  define: {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    underscored: true, // Use snake_case for fields
    freezeTableName: true // Prevent Sequelize from pluralizing table names
  },

  // Timezone configuration
  timezone: process.env.DB_TIMEZONE!,

  // SSL configuration (if enabled)
  dialectOptions: process.env.DB_SSL === 'true' ? {
    ssl: {
      rejectUnauthorized: false
    }
  } : undefined
}; 