// External

// Internal
import { type Role } from '@/common/prisma/prisma.client';

export class RoleDeletedEvent {
  constructor(public readonly role: Role) {}
}
