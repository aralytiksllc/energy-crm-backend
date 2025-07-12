// External dependencies
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal dependencies
import { AppLoggerModule } from '@/common/app-logger/app-logger.module';
import { EmailModule } from '@/common/email/email.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')!, 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        // entities: ['src/entities/*.ts'],
        // migrations: ['src/migrations/*.ts'],
        // migrationsTableName: 'migrations',
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        ssl: false,
      }),
    }),

    AppLoggerModule,

    EmailModule,

    AuthModule,

    UsersModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
