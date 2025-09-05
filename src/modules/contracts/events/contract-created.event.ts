// External

// Internal
import { type Contract } from '@/common/prisma/prisma.client';

export class ContractCreatedEvent {
  constructor(public readonly contract: Contract) {}
}
