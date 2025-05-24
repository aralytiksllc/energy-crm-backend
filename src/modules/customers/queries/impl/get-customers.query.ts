import { Query } from '@/common/query/query';
import { Customer } from '@/models/customer.model';

export class GetCustomersQuery extends Query<Customer> {
  public readonly relations: string[] = ['contacts'];
}
