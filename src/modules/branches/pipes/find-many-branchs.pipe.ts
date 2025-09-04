// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import type { Prisma } from '@/prisma/prisma.service';

@Injectable()
export class FindManyBranchsPipe extends FindManyPipe<
  Prisma.BranchWhereInput,
  Prisma.BranchOrderByWithRelationInput
> {
  constructor() {
    super(
      ['branchName', 'peakLoadKw', 'weatherDataLinkage', 'customerId'],
      [],
      [{ id: 'desc' }],
    );
  }
}
