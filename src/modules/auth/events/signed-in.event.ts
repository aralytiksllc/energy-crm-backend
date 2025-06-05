import { User } from '@/models/user.model';

export class SignedInEvent {
  constructor(public readonly user: User) {}
}
