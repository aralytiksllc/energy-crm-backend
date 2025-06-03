import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Paging } from '@/common/paged';
import { Product } from '@/models/product.model';
import { GetProductsQuery } from '../queries/get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectModel(Product)
    protected readonly productModel: typeof Product,
  ) {}

  async execute(query: GetProductsQuery): Promise<Paging<Product>> {
    const sequelizeOptions = query.toSequelizeOptions();

    const data = await this.productModel.findAndCountAll(sequelizeOptions);

    return new Paging(data.rows, data.count);
  }
}
