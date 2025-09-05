// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Document } from '@/common/prisma/prisma.client';
import { FindManyDocumentsQuery } from './find-many-documents.query';

@QueryHandler(FindManyDocumentsQuery)
export class FindManyDocumentsHandler
  implements IQueryHandler<FindManyDocumentsQuery, Paginate<Document>>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyDocumentsQuery): Promise<Paginate<Document>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prisma.client.$transaction([
      this.prisma.client.document.findMany(findOptions),
      this.prisma.client.document.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
