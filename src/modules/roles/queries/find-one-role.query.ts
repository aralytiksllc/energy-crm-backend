// External

// Internal
import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import { type Prisma } from '@/common/prisma/prisma.client';

export class FindOneRoleQuery extends FindOneQuery<Prisma.RoleWhereInput> {}
