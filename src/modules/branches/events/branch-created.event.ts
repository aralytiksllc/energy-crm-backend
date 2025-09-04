// External

// Internal
import { type Branch } from '@/common/prisma/prisma.client';

export class BranchCreatedEvent {
  constructor(public readonly branch: Branch) {}
}
