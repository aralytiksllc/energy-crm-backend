import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { GetCustomersHandler } from './queries/handlers/get-customers.handler';
import { GetCustomerByIdHandler } from './queries/handlers/get-customer-by-id.handler';
import { CreateCustomerHandler } from './commands/handlers/create-customer.handler';
import { UpdateCustomerHandler } from './commands/handlers/update-customer.handler';
import { DeleteCustomerHandler } from './commands/handlers/delete-customer.handler';
import { CustomersController } from './customers.controller';
import { Customer } from './models/customer.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer]), CqrsModule],
  controllers: [CustomersController],
  providers: [
    GetCustomersHandler,
    GetCustomerByIdHandler,
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,
  ],
})
export class CustomersModule {}
