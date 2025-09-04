// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paginate } from '@/common/paginate';
import type { Role } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyRolesQuery } from './find-many-roles.query';

@QueryHandler(FindManyRolesQuery)
export class FindManyRolesHandler implements IQueryHandler<FindManyRolesQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyRolesQuery): Promise<Paginate<Role>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.role.findMany(findOptions),
      this.prismaService.role.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, 1, 1);
  }
}
