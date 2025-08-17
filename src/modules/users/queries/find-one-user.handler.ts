// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { User } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneUserQuery): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: query.id },
      include: { role: { include: { permissions: true } }, department: true },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
