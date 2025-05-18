import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../models/product.model';
import { GetProductByIdQuery } from '../impl/get-product-by-id.query';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(
    @InjectModel(Product)
    protected readonly productModel: typeof Product,
  ) {}

  async execute(query: GetProductByIdQuery): Promise<Product> {
    const product = await this.productModel.findByPk(query.id);

    if (!product) throw new Error(`Product with ID ${query.id} not found.`);

    return product;
  }
}
