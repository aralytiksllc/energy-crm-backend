import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@/entities/customer.entity';
import { FindManyProductsHandler } from './queries/find-many-products.handler';
import { FindOneCustomerHandler } from './queries/find-one-customer.handler';
import { CreateCustomerHandler } from './commands/create-customer.handler';
import { UpdateCustomerHandler } from './commands/update-customer.handler';
import { DeleteCustomerHandler } from './commands/delete-customer.handler';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CqrsModule],
  controllers: [ProductsController],
  providers: [
    // Query Handlers
    FindManyProductsHandler,
    FindOneCustomerHandler,

    // Command Handlers
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,

    // Others
    ProductsRepository,
    ProductsService,
  ],
  exports: [
    // Others
    ProductsRepository,
    ProductsService,
  ],
})
export class ProductsModule {}
