import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findMany(@Query() query: QueryParams<Customer>): Promise<Paged<Customer>> {
    return this.customerService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.customerService.delete(+id);
  }
}
