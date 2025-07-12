import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { Customer } from '@/entities/customer.entity';

export class FindManySalesQuery extends FindManyQuery<Customer> {}
