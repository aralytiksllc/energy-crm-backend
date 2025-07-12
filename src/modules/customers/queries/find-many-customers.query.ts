// External dependencies

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { Customer } from '@/modules/customers/entities/customer.entity';

export class FindManyCustomersQuery extends FindManyQuery<Customer> {}
