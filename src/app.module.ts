import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLoggerModule } from './common/app-logger/app-logger.module';
import { AuditableModule } from './common/auditable/auditable.module';
import { AuditableUserService } from './modules/users/auditable-user-service';
import { CustomersModule } from './modules/customers/customers.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { ItemsModule } from './modules/items/items.module';
import { UsersModule } from './modules/users/users.module';
import { SalesModule } from './modules/sales/sales.module';

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

    CustomersModule,

    VendorsModule,

    ItemsModule,

    UsersModule,

    SalesModule,
  ],
  providers: [],
})
export class AppModule { }
