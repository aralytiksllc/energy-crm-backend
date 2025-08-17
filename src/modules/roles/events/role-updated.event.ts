// External

// Internal
import type { Role } from '@/prisma/prisma.client';

export class RoleUpdatedEvent {
  constructor(public readonly role: Role) {}
}
