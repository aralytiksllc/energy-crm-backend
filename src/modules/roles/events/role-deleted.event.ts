// External

// Internal
import type { Role } from '@/prisma/prisma.client';

export class RoleDeletedEvent {
  constructor(public readonly role: Role) {}
}
