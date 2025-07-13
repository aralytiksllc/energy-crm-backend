// External dependencies
import { Prisma } from '@prisma/client';

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';

export class FindManyHistoriesQuery extends FindManyQuery<
  Prisma.HistoryWhereInput,
  Prisma.HistoryOrderByWithRelationInput
> {}
