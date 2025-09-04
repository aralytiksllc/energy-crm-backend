// External

// Internal
import { type User } from '@/common/prisma/prisma.client';

export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}
