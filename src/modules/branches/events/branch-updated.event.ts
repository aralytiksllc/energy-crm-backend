// External

// Internal
import { type Branch } from '@/common/prisma/prisma.client';

export class BranchUpdatedEvent {
  constructor(public readonly branch: Branch) {}
}
