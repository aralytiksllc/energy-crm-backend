// External

// Internal
import { type Customer } from '@/common/prisma/prisma.client';

export class CustomerCreatedEvent {
  constructor(public readonly customer: Customer) {}
}
