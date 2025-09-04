// External

// Internal
import { type Role } from '@/common/prisma/prisma.client';

export class RoleCreatedEvent {
  constructor(public readonly role: Role) {}
}
