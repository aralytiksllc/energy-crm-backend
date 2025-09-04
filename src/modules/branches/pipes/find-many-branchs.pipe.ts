// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

@Injectable()
export class FindManyBranchsPipe extends FindManyPipe<
  Prisma.BranchWhereInput,
  Prisma.BranchOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'name',
        'address',
        'cityRegion',
        'operationalStatus',
        'customerId',
        'contactId',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
