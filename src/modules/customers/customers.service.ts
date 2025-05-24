import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Paging } from '@/common/paging';
import { QueryParams } from '@/common/query/query-params';
import { Customer } from '@/models/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { GetCustomersQuery } from './queries/get-customers.query';
import { GetCustomerByIdQuery } from './queries/get-customer-by-id.query';
import { CreateCustomerCommand } from './commands/create-customer.command';
import { UpdateCustomerCommand } from './commands/update-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer.command';

@Injectable()
export class CustomersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(queryParams: QueryParams<Customer>): Promise<Paging<Customer>> {
    return this.queryBus.execute(new GetCustomersQuery(queryParams));
  }

  async findOne(id: number): Promise<Customer> {
    return this.queryBus.execute(new GetCustomerByIdQuery(id));
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
