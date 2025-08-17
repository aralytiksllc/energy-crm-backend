// External

// Internal
import type { User } from '@/prisma/prisma.client';

export class UserDeletedEvent {
  constructor(public readonly user: User) {}
}
