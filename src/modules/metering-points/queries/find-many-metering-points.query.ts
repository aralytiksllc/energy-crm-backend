// External

// Internal
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { type Prisma } from '@/common/prisma/prisma.client';

export class FindManyMeteringPointsQuery extends FindManyQuery<Prisma.MeteringPointWhereInput> {}
