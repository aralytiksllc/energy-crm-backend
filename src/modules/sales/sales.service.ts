// External dependencies
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// Internal dependencies
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Customer } from '@/modules/sales/entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CreateCustomerCommand } from './commands/create-customer.command';
import { UpdateCustomerCommand } from './commands/update-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer.command';
import { FindManySalesQuery } from './queries/find-many-sales.query';
import { FindOneCustomerQuery } from './queries/find-one-customer.query';

@Injectable()
export class SalesService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(queryParams: QueryParams<Customer>): Promise<Paged<Customer>> {
    return this.queryBus.execute(new FindManySalesQuery(queryParams));
  }

  async findOne(id: number): Promise<Customer> {
    return this.queryBus.execute(new FindOneCustomerQuery(id));
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    return this.commandBus.execute(new CreateCustomerCommand(dto));
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    return this.commandBus.execute(new UpdateCustomerCommand(id, dto));
  }

  async delete(id: number): Promise<void> {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }
}
