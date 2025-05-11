import { Query } from '@/common/query/query';
import { Sale } from '../../entities/sale.entity';

export class GetSalesQuery extends Query<Sale> {
  public readonly relations: string[] = ['customer'];
}
