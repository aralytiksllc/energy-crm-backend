// External
import type { User } from '@prisma/client';

// Internal

export class LoggedInEvent {
  constructor(public readonly user: User) {}
}
