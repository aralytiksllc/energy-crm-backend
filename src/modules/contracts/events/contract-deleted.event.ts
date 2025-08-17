// External

// Internal
import type { Contract } from '@/prisma/prisma.client';

export class ContractDeletedEvent {
  constructor(public readonly contract: Contract) {}
}
