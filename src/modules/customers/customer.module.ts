// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateCustomerHandler } from './commands/create-customer.handler';
import { DeleteCustomerHandler } from './commands/delete-customer.handler';
import { FindManyCustomersPipe } from './pipes/find-many-customers.pipe';
import { FindManyCustomersHandler } from './queries/find-many-customers.handler';
import { FindOneCustomerHandler } from './queries/find-one-customer.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateCustomerHandler } from './commands/update-customer.handler';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [CustomerController],
  providers: [
    FindManyCustomersPipe,
    FindManyCustomersHandler,
    FindOneCustomerHandler,
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,
    CustomerService,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
