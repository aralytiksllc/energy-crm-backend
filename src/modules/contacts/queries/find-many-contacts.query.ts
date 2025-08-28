// External

// Internal
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import type { Prisma } from '@/prisma/prisma.client';

export class FindManyContactsQuery extends FindManyQuery<Prisma.ContactWhereInput> {}
