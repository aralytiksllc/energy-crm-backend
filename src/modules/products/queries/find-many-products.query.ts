// External dependencies

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { Customer } from '@/modules/products/entities/customer.entity';

export class FindManyProductsQuery extends FindManyQuery<Customer> {}
