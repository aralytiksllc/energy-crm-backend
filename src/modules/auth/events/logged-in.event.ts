// External

// Internal
import { type User } from '@/common/prisma/prisma.client';

export class LoggedInEvent {
  constructor(public readonly user: User) {}
}
