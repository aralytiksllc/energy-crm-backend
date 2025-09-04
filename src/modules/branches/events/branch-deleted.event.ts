// External

// Internal
import { type Branch } from '@/common/prisma/prisma.client';

export class BranchDeletedEvent {
  constructor(public readonly branch: Branch) {}
}
