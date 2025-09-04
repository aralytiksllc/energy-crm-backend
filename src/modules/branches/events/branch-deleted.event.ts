// External

// Internal
import type { Branch } from '@/prisma/prisma.service';

export class BranchDeletedEvent {
  constructor(public readonly branch: Branch) {}
}
