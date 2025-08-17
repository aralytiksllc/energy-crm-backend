// External

// Internal
import type { Branch } from '@/prisma/prisma.client';

export class BranchDeletedEvent {
  constructor(public readonly branch: Branch) {}
}
