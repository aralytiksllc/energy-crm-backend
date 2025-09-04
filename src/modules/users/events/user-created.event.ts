// External

// Internal
import { type User } from '@/prisma/prisma.client';

export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}
