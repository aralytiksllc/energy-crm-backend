import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@/entities/customer.entity';
import { FindManySalesHandler } from './queries/find-many-sales.handler';
import { FindOneCustomerHandler } from './queries/find-one-customer.handler';
import { CreateCustomerHandler } from './commands/create-customer.handler';
import { UpdateCustomerHandler } from './commands/update-customer.handler';
import { DeleteCustomerHandler } from './commands/delete-customer.handler';
import { SalesController } from './sales.controller';
import { SalesRepository } from './sales.repository';
import { SalesService } from './sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CqrsModule],
  controllers: [SalesController],
  providers: [
    // Query Handlers
    FindManySalesHandler,
    FindOneCustomerHandler,

    // Command Handlers
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,

    // Others
    SalesRepository,
    SalesService,
  ],
  exports: [
    // Others
    SalesRepository,
    SalesService,
  ],
})
export class SalesModule {}
