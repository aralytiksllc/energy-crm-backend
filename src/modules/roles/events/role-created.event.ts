// External

// Internal
import type { Role } from '@/prisma/prisma.service';

export class RoleCreatedEvent {
  constructor(public readonly role: Role) {}
}
