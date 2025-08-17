// External

// Internal
import type { User } from '@/prisma/prisma.client';

export class UserUpdatedEvent {
  constructor(public readonly user: User) {}
}
