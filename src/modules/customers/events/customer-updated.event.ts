// External

// Internal
import { type Customer } from '@/common/prisma/prisma.client';

export class CustomerUpdatedEvent {
  constructor(public readonly customer: Customer) {}
}
