// External dependencies

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { Customer } from '@/modules/sales/entities/customer.entity';

export class FindManySalesQuery extends FindManyQuery<Customer> {}
