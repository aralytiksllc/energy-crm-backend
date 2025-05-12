import { Query } from '@/common/query/query';
import { Product } from '../../entities/product.entity';

export class GetProductsQuery extends Query<Product> {
  public readonly relations: string[] = ['vendor'];
}
