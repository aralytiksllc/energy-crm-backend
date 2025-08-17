// External
import type { User } from '@prisma/client';

// Internal

export class PasswordChangedEvent {
  constructor(public readonly user: User) {}
}
