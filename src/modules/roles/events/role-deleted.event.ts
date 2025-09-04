// External

// Internal
import type { Role } from '@/prisma/prisma.service';

export class RoleDeletedEvent {
  constructor(public readonly role: Role) {}
}
