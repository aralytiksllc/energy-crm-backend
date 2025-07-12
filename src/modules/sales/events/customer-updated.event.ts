import { Customer } from '@/entities/customer.entity';

export class CustomerUpdatedEvent {
  constructor(public readonly customer: Customer) {}
}
