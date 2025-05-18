import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppLoggerModule } from './common/app-logger/app-logger.module';
import { CustomersModule } from './modules/customers/customers.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    AppLoggerModule,

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'tt-core-flow',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),

    CustomersModule,

    VendorsModule,

    ProductsModule,

    UsersModule,

    SalesModule,
  ],
  providers: [],
})
export class AppModule {}
