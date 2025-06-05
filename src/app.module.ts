import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppLoggerModule } from './common/app-logger/app-logger.module';
import { User } from './models/user.model';
import { Vendor } from './models/vendor.model';
import { AuthModule } from './modules/auth/auth.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppLoggerModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [User, Vendor],
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
    }),
    AuthModule,
    VendorsModule,
    UsersModule,
  ],
  exports: [SequelizeModule],
  providers: [],
})
export class AppModule {}
