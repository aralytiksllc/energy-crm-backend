import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CreateCustomerCommand } from './commands/create-customer.command';
import { UpdateCustomerCommand } from './commands/update-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer.command';
import { FindManyCustomersQuery } from './queries/find-many-customers.query';
import { FindOneCustomerQuery } from './queries/find-one-customer.query';

@Injectable()
export class CustomerService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(params: QueryParams<Customer>): Promise<Paged<Customer>> {
    const query = new FindManyCustomersQuery(params);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Customer> {
    const query = new FindOneCustomerQuery(id);
    return this.queryBus.execute(query);
  }

  async create(
    dto: CreateCustomerDto,
    options?: SaveOptions,
  ): Promise<Customer> {
    const command = new CreateCustomerCommand(dto, options);
    return this.commandBus.execute(command);
  }

  async update(
    id: number,
    dto: UpdateCustomerDto,
    options?: SaveOptions,
  ): Promise<Customer> {
    const command = new UpdateCustomerCommand(id, dto, options);
    return this.commandBus.execute(command);
  }

  async delete(id: number, options?: RemoveOptions): Promise<void> {
    const command = new DeleteCustomerCommand(id, options);
    return this.commandBus.execute(command);
  }
}
