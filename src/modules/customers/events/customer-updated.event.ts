// External

// Internal
import { type Customer } from '@/prisma/prisma.client';

export class CustomerUpdatedEvent {
  constructor(public readonly customer: Customer) {}
}
