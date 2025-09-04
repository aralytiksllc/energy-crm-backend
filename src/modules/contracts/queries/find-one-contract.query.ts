// External

// Internal
import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import type { Prisma } from '@/prisma/prisma.service';

export class FindOneContractQuery extends FindOneQuery<Prisma.ContractWhereInput> {}
