// External dependencies
import { User } from '@prisma/client';

// Internal dependencies

export class UserDeletedEvent {
  constructor(public readonly user: User) {}
}
