// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

@Injectable()
export class FindManyContactsPipe extends FindManyPipe<
  Prisma.ContactWhereInput,
  Prisma.ContactOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'id',
        'name',
        'type',
        'department',
        'role',
        'phone',
        'email',
        'status',
        'preferredLanguage',
        'branchName',
        'customerId',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
