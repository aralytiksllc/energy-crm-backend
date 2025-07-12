// External dependencies

// Internal dependencies
import { Customer } from '@/modules/customers/entities/customer.entity';

export class CustomerDeletedEvent {
  constructor(public readonly customer: Customer) {}
}
