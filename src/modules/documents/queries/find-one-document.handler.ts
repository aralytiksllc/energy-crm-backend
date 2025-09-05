// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Document } from '@/common/prisma/prisma.client';
import { FindOneDocumentQuery } from './find-one-document.query';

@QueryHandler(FindOneDocumentQuery)
export class FindOneDocumentHandler
  implements IQueryHandler<FindOneDocumentQuery>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneDocumentQuery): Promise<Document> {
    return await this.prisma.client.document.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
