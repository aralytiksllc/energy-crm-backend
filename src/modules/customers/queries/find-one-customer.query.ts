import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import { Customer } from '../entities/customer.entity';

export class FindOneCustomerQuery extends FindOneQuery<Customer> {}
