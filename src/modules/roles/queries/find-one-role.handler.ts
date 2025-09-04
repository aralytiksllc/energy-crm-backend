// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { Role } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneRoleQuery } from './find-one-role.query';

@QueryHandler(FindOneRoleQuery)
export class FindOneRoleHandler implements IQueryHandler<FindOneRoleQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneRoleQuery): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { id: query.id },
      include: { permissions: true },
    });

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    return role;
  }
}
