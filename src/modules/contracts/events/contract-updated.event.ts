// External

// Internal
import type { Contract } from '@/prisma/prisma.client';

export class ContractUpdatedEvent {
  constructor(public readonly contract: Contract) {}
}
