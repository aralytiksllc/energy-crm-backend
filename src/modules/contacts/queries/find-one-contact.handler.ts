// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Contact } from '@/common/prisma/prisma.client';
import { FindOneContactQuery } from './find-one-contact.query';

@QueryHandler(FindOneContactQuery)
export class FindOneContactHandler
  implements IQueryHandler<FindOneContactQuery, Contact>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneContactQuery): Promise<Contact> {
    return await this.prisma.client.contact.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
