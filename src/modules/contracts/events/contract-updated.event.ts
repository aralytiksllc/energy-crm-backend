// External

// Internal
import type { Contract } from '@/prisma/prisma.service';

export class ContractUpdatedEvent {
  constructor(public readonly contract: Contract) {}
}
