import { User } from '@/entities/user.entity';

export class PasswordUpdatedEvent {
  constructor(public readonly user: User) {}
}
