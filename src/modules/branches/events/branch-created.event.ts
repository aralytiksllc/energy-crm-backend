// External

// Internal
import type { Branch } from '@/prisma/prisma.service';

export class BranchCreatedEvent {
  constructor(public readonly branch: Branch) {}
}
