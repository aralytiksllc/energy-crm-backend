// External

// Internal
import { type User } from '@/common/prisma/prisma.client';

export class UserUpdatedEvent {
  constructor(public readonly user: User) {}
}
