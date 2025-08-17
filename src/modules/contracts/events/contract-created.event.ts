// External

// Internal
import type { Contract } from '@/prisma/prisma.client';

export class ContractCreatedEvent {
  constructor(public readonly contract: Contract) {}
}
