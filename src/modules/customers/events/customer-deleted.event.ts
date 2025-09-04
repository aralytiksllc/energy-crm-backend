// External

// Internal
import { type Customer } from '@/prisma/prisma.client';

export class CustomerDeletedEvent {
  constructor(public readonly customer: Customer) {}
}
