// External dependencies

// Internal dependencies
import { Customer } from '@/modules/products/entities/customer.entity';

export class CustomerCreatedEvent {
  constructor(public readonly customer: Customer) {}
}
