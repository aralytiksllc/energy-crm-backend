// External dependencies

// Internal dependencies
import { Customer } from '@/modules/products/entities/customer.entity';

export class CustomerDeletedEvent {
  constructor(public readonly customer: Customer) {}
}
