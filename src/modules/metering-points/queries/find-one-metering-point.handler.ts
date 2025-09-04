// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type MeteringPoint } from '@/prisma/prisma.client';
import { FindOneMeteringPointQuery } from './find-one-metering-point.query';

@QueryHandler(FindOneMeteringPointQuery)
export class FindOneMeteringPointHandler
  implements IQueryHandler<FindOneMeteringPointQuery>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneMeteringPointQuery): Promise<MeteringPoint> {
    return await this.prismaService.client.meteringPoint.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
