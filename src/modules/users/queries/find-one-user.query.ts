import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import { User } from '@/models/user.model';

export class FindOneUserQuery extends FindOneQuery<User> {}
