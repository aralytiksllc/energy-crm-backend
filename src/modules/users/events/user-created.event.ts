// External dependencies

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';

export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}
