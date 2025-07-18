// External dependencies
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal dependencies
import { Customer } from './entities/customer.entity';
import { FindManyCustomersHandler } from './queries/find-many-customers.handler';
import { FindOneCustomerHandler } from './queries/find-one-customer.handler';
import { CreateCustomerHandler } from './commands/create-customer.handler';
import { UpdateCustomerHandler } from './commands/update-customer.handler';
import { DeleteCustomerHandler } from './commands/delete-customer.handler';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CqrsModule],
  controllers: [CustomerController],
  providers: [
    // Query Handlers
    FindManyCustomersHandler,
    FindOneCustomerHandler,

    // Command Handlers
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,

    // Others
    CustomerService,
  ],
  exports: [
    // Others
    CustomerService,
  ],
})
export class CustomerModule {}
