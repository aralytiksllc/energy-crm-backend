import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { User } from '@/models/user.model';

export class FindManyUsersQuery extends FindManyQuery<User> {}
