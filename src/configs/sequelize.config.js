// Load environment variables
require('dotenv').config();

// Database connection configuration
const sequelizeConfig = {
  // Connection settings
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'tt-core-flow',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres',
  
  // Logging configuration
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  
  // Additional options
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  
  // Define options
  define: {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    underscored: true // Use snake_case for fields
  }
};

module.exports = sequelizeConfig; 