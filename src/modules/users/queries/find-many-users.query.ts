// External dependencies
import { Prisma } from '@prisma/client';

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';

export class FindManyUsersQuery extends FindManyQuery<
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput
> {}
