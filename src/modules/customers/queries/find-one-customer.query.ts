// External dependencies

// Internal dependencies
import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import { Customer } from '@/modules/customers/entities/customer.entity';

export class FindOneCustomerQuery extends FindOneQuery<Customer> {}
