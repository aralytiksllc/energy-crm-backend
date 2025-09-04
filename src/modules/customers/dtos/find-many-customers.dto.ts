// External

// Internal
import { FindManyDto } from '@/common/cqrs/queries/find-many.dto';
import { type Prisma } from '@/common/prisma/prisma.client';

export class FindManyCustomersDto extends FindManyDto<Prisma.CustomerWhereInput> {}
