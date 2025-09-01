// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Document } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyDocumentsQuery } from './find-many-documents.query';

@QueryHandler(FindManyDocumentsQuery)
export class FindManyDocumentsHandler implements IQueryHandler<FindManyDocumentsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyDocumentsQuery): Promise<Paged<Document>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.document.findMany(findOptions),
      this.prismaService.document.count({ where: findOptions.where }),
    ]);

    return new Paged(rows, count, 1, 1);
  }
}
