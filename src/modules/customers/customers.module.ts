import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetCustomersHandler } from './handlers/get-customers.handler';
import { GetCustomerByIdHandler } from './handlers/get-customer-by-id.handler';
import { CreateCustomerHandler } from './handlers/create-customer.handler';
import { UpdateCustomerHandler } from './handlers/update-customer.handler';
import { DeleteCustomerHandler } from './handlers/delete-customer.handler';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    GetCustomersHandler,
    GetCustomerByIdHandler,
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,
  ],
})
export class CustomersModule {}
