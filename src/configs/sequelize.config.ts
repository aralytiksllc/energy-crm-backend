import { Options } from 'sequelize';
import { databaseConfig } from './database.config';

// Sequelize ORM configuration
const sequelizeConfig: Options = {
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: 'postgres' as const,
  schema: databaseConfig.schema,

  // Logging configuration
  logging: process.env.NODE_ENV === 'development' ? console.log : false,

  // Model configuration
  define: {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    underscored: true, // Use snake_case for fields
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  },

  // Timezone configuration
  timezone: databaseConfig.timezone,

  // SSL configuration (if enabled)
  dialectOptions: databaseConfig.ssl
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : undefined,
};

export default sequelizeConfig;
