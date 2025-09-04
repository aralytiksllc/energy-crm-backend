// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Role } from '@/common/prisma/prisma.client';
import { FindOneRoleQuery } from './find-one-role.query';

@QueryHandler(FindOneRoleQuery)
export class FindOneRoleHandler
  implements IQueryHandler<FindOneRoleQuery, Role>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneRoleQuery): Promise<Role> {
    return await this.prisma.client.role.findUniqueOrThrow({
      where: { id: query.id },
      include: { permissions: true },
    });
  }
}
