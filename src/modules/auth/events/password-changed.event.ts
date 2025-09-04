// External

// Internal
import { type User } from '@/common/prisma/prisma.client';

export class PasswordChangedEvent {
  constructor(public readonly user: User) {}
}
