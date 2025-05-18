import { Query } from '@/common/query/query';
import { Product } from '../../models/product.model';

export class GetProductsQuery extends Query<Product> {
  public readonly relations: string[] = ['vendor'];
}
