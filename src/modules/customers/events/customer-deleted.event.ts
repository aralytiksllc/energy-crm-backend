// External

// Internal
import { type Customer } from '@/common/prisma/prisma.client';

export class CustomerDeletedEvent {
  constructor(public readonly customer: Customer) {}
}
