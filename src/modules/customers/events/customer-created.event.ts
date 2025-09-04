// External

// Internal
import { type Customer } from '@/prisma/prisma.client';

export class CustomerCreatedEvent {
  constructor(public readonly customer: Customer) {}
}
