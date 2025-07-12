import { Customer } from '../entities/customer.entity';

export class CustomerDeletedEvent {
  constructor(public readonly customer: Customer) {}
}
