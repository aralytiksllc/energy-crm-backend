import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paging } from '@/common/paging';
import { Product } from '../../entities/product.entity';
import { GetProductsQuery } from '../impl/get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {}

  async execute(query: GetProductsQuery): Promise<Paging<Product>> {
    const findOptions = query.toFindOptions();

    const [products, total] = await this.repository.findAndCount(findOptions);

    return new Paging(products, total);
  }
}
