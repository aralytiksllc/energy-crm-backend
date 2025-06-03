import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Paging } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Product } from '@/models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQuery } from './queries/get-products.query';
import { GetProductByIdQuery } from './queries/get-product-by-id.query';
import { DeleteProductCommand } from './commands/delete-product.command';
import { CreateProductCommand } from './commands/create-product.command';
import { UpdateProductCommand } from './commands/update-product.command';

@Injectable()
export class ProductsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(queryParams: QueryParams<Product>): Promise<Paging<Product>> {
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
