// External

// Internal
import { type User } from '@/common/prisma/prisma.client';

export class UserDeletedEvent {
  constructor(public readonly user: User) {}
}
