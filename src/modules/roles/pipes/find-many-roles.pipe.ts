// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import { type Prisma } from '@/common/prisma/prisma.client';

@Injectable()
export class FindManyRolesPipe extends FindManyPipe<
  Prisma.RoleWhereInput,
  Prisma.RoleOrderByWithRelationInput
> {
  constructor() {
    super(['id', 'name', 'description'], [], [{ id: 'desc' }]);
  }
}
