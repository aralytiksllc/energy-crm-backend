import { Customer } from '../entities/customer.entity';

export class CustomerCreatedEvent {
  constructor(public readonly customer: Customer) {}
}
