// External

// Internal
import { FindManyDto } from '@/common/cqrs/queries/find-many.dto';
import type { Prisma } from '@/prisma/prisma.service';

export class FindManyCustomersDto extends FindManyDto<Prisma.CustomerWhereInput> {}
