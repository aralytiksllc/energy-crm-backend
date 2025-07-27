// External dependencies
import { defineConfig } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';

// Internal dependencies

dotenv.config();

export default defineConfig({
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
  },
  debug: true,
});
