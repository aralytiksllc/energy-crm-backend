// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type MeteringPoint } from '@/common/prisma/prisma.client';
import { FindOneMeteringPointQuery } from './find-one-metering-point.query';

@QueryHandler(FindOneMeteringPointQuery)
export class FindOneMeteringPointHandler
  implements IQueryHandler<FindOneMeteringPointQuery, MeteringPoint>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneMeteringPointQuery): Promise<MeteringPoint> {
    return await this.prisma.client.meteringPoint.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
