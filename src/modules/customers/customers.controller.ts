import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationResult } from '@/common/pagination/pagination.interfaces';
import { QueryParams } from '@/common/query/query-params';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DeleteCustomerCommand } from './commands/impl/delete-customer.command';
import { CreateCustomerCommand } from './commands/impl/create-customer.command';
import { UpdateCustomerCommand } from './commands/impl/update-customer.command';
import { GetCustomerByIdQuery } from './queries/impl/get-customer-by-id.query';
import { GetCustomersQuery } from './queries/impl/get-customers.query';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(
    @Query() queryParams: QueryParams<Customer>,
  ): Promise<PaginationResult<Customer>> {
    return this.queryBus.execute(new GetCustomersQuery(queryParams));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.queryBus.execute(new GetCustomerByIdQuery(id));
  }

  @Post()
  async create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.commandBus.execute(new CreateCustomerCommand(dto));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.commandBus.execute(new UpdateCustomerCommand(id, dto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }
}
