// External dependencies

// Internal dependencies
import { Customer } from '@/modules/sales/entities/customer.entity';

export class CustomerUpdatedEvent {
  constructor(public readonly customer: Customer) {}
}
