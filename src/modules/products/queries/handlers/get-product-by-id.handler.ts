import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { GetProductByIdQuery } from '../impl/get-product-by-id.query';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {}

  async execute(query: GetProductByIdQuery): Promise<Product> {
    const where = { id: query.id } as FindOptionsWhere<Product>;
    return await this.repository.findOneOrFail({ where });
  }
}
