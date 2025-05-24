import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppLoggerModule } from './common/app-logger/app-logger.module';
import { CustomersModule } from './modules/customers/customers.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { SalesModule } from './modules/sales/sales.module';
import { Contact } from './models/contact.model';
import { Address } from './models/address.model';
import { Customer } from './modules/customers/models/customer.model';
import { Sale } from './modules/sales/models/sale.model';
import { SaleItem } from './modules/sales/models/sale-item.model';
import { Product } from './modules/products/models/product.model';
import { Vendor } from './modules/vendors/models/vendor.model';
import { User } from './modules/users/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AppLoggerModule,

    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_NAME');
        const environment = configService.get('NODE_ENV') || 'development';

        console.log('Database Config:', {
          host,
          port,
          username,
          database,
          environment,
          // password hidden for security
        });

        return {
          dialect: 'postgres',
          host,
          port,
          username,
          password,
          database,
          models: [Contact, Address, Customer, Sale, SaleItem, Product, Vendor, User],
          autoLoadModels: true,
          synchronize: false,
          logging: environment === 'development' ? console.log : false,
          define: {
            timestamps: true,
            underscored: false,
            freezeTableName: true,
          },
          retry: {
            max: 5,
            match: [
              /SequelizeConnectionError/,
              /SequelizeConnectionRefusedError/,
              /SequelizeHostNotFoundError/,
              /SequelizeHostNotReachableError/,
              /SequelizeInvalidConnectionError/,
              /SequelizeConnectionTimedOutError/,
              /TimeoutError/,
            ],
          },
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        };
      },
    }),

    UsersModule,
    CustomersModule,
    VendorsModule,
    ProductsModule,
    SalesModule,
  ],
  providers: [],
})
export class AppModule {}
