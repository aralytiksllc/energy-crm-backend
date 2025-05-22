import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationResult } from '@/common/pagination/pagination.interfaces';
import { QueryParams } from '@/common/query/query-params';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductCommand } from './commands/impl/delete-product.command';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { UpdateProductCommand } from './commands/impl/update-product.command';
import { GetProductByIdQuery } from './queries/impl/get-product-by-id.query';
import { GetProductsQuery } from './queries/impl/get-products.query';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(
    queryParams: QueryParams<Product>,
  ): Promise<PaginationResult<Product>> {
    return this.queryBus.execute(new GetProductsQuery(queryParams));
  }

  async findOne(id: string): Promise<Product> {
    return this.queryBus.execute(new GetProductByIdQuery(id));
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return this.commandBus.execute(new CreateProductCommand(dto));
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.commandBus.execute(new UpdateProductCommand(id, dto));
  }

  async delete(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}
