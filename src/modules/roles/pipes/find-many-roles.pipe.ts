// External
import { Injectable } from '@nestjs/common';

// Internal
import { FindManyPipe } from '@/common/cqrs/queries/find-many.pipe';
import type { Prisma } from '@/prisma/prisma.service';

@Injectable()
export class FindManyRolesPipe extends FindManyPipe<
  Prisma.RoleWhereInput,
  Prisma.RoleOrderByWithRelationInput
> {
  constructor() {
    super(['id', 'name'], [], [{ id: 'desc' }]);
  }
}
