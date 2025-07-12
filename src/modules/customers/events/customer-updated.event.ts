// External dependencies

// Internal dependencies
import { Customer } from '@/modules/customers/entities/customer.entity';

export class CustomerUpdatedEvent {
  constructor(public readonly customer: Customer) {}
}
