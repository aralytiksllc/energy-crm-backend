// External dependencies
import { User } from '@prisma/client';

// Internal dependencies
import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';

export class FindOneUserQuery extends FindOneQuery<User> {}
