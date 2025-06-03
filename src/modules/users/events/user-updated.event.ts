import { User } from '@/models/user.model';

export class UserUpdatedEvent {
  constructor(public readonly user: User) {}
}
