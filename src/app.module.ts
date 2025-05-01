import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLoggerModule } from './common/app-logger/app-logger.module';
import { AuditableModule } from './common/auditable/auditable.module';
import { AuditableUserService } from './modules/users/auditable-user-service';
import { VendorModule } from './modules/vendors/vendor.module';
import { ItemModule } from './modules/items/item.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    AppLoggerModule,

    AuditableModule.forProvider(AuditableUserService),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'tt-core-flow',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: false,
      subscribers: [],
    }),

    VendorModule,

    ItemModule,

    UserModule,
  ],
  providers: [],
})
export class AppModule {}
