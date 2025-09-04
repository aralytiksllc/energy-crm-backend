// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

// Internal
import { Paginate } from '@/common/paginate';
import type { Document } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyDocumentsQuery } from './find-many-documents.query';

@QueryHandler(FindManyDocumentsQuery)
export class FindManyDocumentsHandler implements IQueryHandler<FindManyDocumentsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyDocumentsQuery): Promise<Paginate<Document>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.document.findMany(findOptions),
      this.prismaService.document.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, 1, 1);
  }
}
