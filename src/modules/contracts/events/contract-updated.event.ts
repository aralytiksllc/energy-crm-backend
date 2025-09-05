// External

// Internal
import { type Contract } from '@/common/prisma/prisma.client';

export class ContractUpdatedEvent {
  constructor(public readonly contract: Contract) {}
}
