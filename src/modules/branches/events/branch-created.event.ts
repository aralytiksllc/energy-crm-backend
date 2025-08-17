// External

// Internal
import type { Branch } from '@/prisma/prisma.client';

export class BranchCreatedEvent {
  constructor(public readonly branch: Branch) {}
}
