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
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findMany(@Query() query: QueryParams<Customer>): Promise<Paged<Customer>> {
    return this.productsService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.productsService.create(createCustomerDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.productsService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.delete(+id);
  }
}
