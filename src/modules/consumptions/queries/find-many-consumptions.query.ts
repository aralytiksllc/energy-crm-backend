// External

// Internal
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import type { Prisma } from '@/prisma/prisma.service';

export class FindManyConsumptionsQuery extends FindManyQuery<Prisma.ConsumptionFileWhereInput> {}
