import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLoggerModule } from './common/app-logger/app-logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['src/**/*.entity.ts'],
        migrations: ['src/migrations/*.ts'],
        migrationsTableName: 'migrations',
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
    }),

    AppLoggerModule,

    AuthModule,

    VendorsModule,

    UsersModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
