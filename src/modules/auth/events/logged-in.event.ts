import { User } from '@/entities/user.entity';

export class LoggedInEvent {
  constructor(public readonly user: User) {}
}
