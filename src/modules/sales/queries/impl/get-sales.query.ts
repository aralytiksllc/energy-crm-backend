import { Query } from '@/common/query/query';
import { Sale } from '@/models/sale.model';

export class GetSalesQuery extends Query<Sale> {
  public readonly relations: string[] = ['customer'];
}
