// External dependencies

// Internal dependencies
import { Customer } from '@/modules/products/entities/customer.entity';

export class CustomerUpdatedEvent {
  constructor(public readonly customer: Customer) {}
}
