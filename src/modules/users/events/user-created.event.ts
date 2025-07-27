// External dependencies

// Internal dependencies
import { User } from '../entities/user.entity';

export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}
