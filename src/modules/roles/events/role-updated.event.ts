// External

// Internal
import { type Role } from '@/common/prisma/prisma.client';

export class RoleUpdatedEvent {
  constructor(public readonly role: Role) {}
}
