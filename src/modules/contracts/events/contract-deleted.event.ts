// External

// Internal
import { type Contract } from '@/common/prisma/prisma.client';

export class ContractDeletedEvent {
  constructor(public readonly contract: Contract) {}
}
