// External

// Internal
import type { Role } from '@/prisma/prisma.service';

export class RoleUpdatedEvent {
  constructor(public readonly role: Role) {}
}
