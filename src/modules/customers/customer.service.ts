// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { type Customer } from '@/common/prisma/prisma.client';
import { CreateCustomerCommand } from './commands/create-customer.command';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { DeleteCustomerCommand } from './commands/delete-customer.command';
import { FindManyCustomersDto } from './dtos/find-many-customers.dto';
import { FindManyCustomersQuery } from './queries/find-many-customers.query';
import { FindOneCustomerQuery } from './queries/find-one-customer.query';
import { UpdateCustomerCommand } from './commands/update-customer.command';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: FindManyCustomersDto): Promise<Paginate<Customer>> {
    const query = new FindManyCustomersQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Customer> {
    const query = new FindOneCustomerQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const command = new CreateCustomerCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    const command = new UpdateCustomerCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<Customer> {
    const command = new DeleteCustomerCommand(id);
    return this.commandBus.execute(command);
  }
}
