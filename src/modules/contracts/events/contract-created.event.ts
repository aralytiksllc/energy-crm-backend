// External

// Internal
import type { Contract } from '@/prisma/prisma.service';

export class ContractCreatedEvent {
  constructor(public readonly contract: Contract) {}
}
