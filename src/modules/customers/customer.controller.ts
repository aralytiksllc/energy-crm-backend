// External
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

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Customer } from '@/prisma/prisma.client';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { FindManyCustomersDto } from './dtos/find-many-customers.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { FindManyCustomersPipe } from './pipes/find-many-customers.pipe';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findMany(
    @Query(FindManyCustomersPipe) dto: FindManyCustomersDto,
  ): Promise<Paged<Customer>> {
    return this.customerService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Customer> {
    return this.customerService.delete(+id);
  }
}
