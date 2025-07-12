import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Customer } from '@/entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findMany(@Query() query: QueryParams<Customer>): Promise<Paged<Customer>> {
    return this.salesService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.salesService.findOne(+id);
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.salesService.create(createCustomerDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.salesService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.salesService.delete(+id);
  }
}
