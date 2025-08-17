// External

// Internal
import type { Role } from '@/prisma/prisma.client';

export class RoleCreatedEvent {
  constructor(public readonly role: Role) {}
}
