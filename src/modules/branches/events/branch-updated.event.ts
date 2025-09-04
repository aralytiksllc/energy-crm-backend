// External

// Internal
import type { Branch } from '@/prisma/prisma.service';

export class BranchUpdatedEvent {
  constructor(public readonly branch: Branch) {}
}
