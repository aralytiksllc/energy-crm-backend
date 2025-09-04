// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

@Injectable()
export class FindManyUsersPipe extends FindManyPipe<
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput
> {
  constructor() {
    super(
      [
        'id',
        'firstName',
        'lastName',
        'email',
        'password',
        'isActive',
        'roleId',
        'departmentId',
      ],
      [],
      [{ id: 'desc' }],
    );
  }
}
