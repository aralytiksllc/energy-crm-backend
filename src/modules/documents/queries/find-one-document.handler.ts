// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { Document } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneDocumentQuery } from './find-one-document.query';

@QueryHandler(FindOneDocumentQuery)
export class FindOneDocumentHandler implements IQueryHandler<FindOneDocumentQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneDocumentQuery): Promise<Document> {
    const document = await this.prisma.document.findUnique({
      where: { id: query.id },
    });

    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    return document;
  }
}
