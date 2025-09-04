// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Role } from '@/common/prisma/prisma.client';
import { FindManyRolesQuery } from './find-many-roles.query';

@QueryHandler(FindManyRolesQuery)
export class FindManyRolesHandler
  implements IQueryHandler<FindManyRolesQuery, Paginate<Role>>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyRolesQuery): Promise<Paginate<Role>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prisma.client.$transaction([
      this.prisma.client.role.findMany(findOptions),
      this.prisma.client.role.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, 1, 1);
  }
}
