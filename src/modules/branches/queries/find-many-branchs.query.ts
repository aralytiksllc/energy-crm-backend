// External

// Internal
import { FindManyDto } from '@/common/cqrs/queries/find-many.dto';
import type { Prisma } from '@/prisma/prisma.client';

export class FindManyBranchsQuery {
  constructor(
    public readonly customerId: number,
    public readonly dto: FindManyDto<Prisma.BranchWhereInput>,
  ) {}
}
