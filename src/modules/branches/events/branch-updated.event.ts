// External

// Internal
import type { Branch } from '@/prisma/prisma.client';

export class BranchUpdatedEvent {
  constructor(public readonly branch: Branch) {}
}
