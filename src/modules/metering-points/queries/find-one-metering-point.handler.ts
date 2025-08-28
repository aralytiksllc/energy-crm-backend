// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { MeteringPoint } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneMeteringPointQuery } from './find-one-metering-point.query';

@QueryHandler(FindOneMeteringPointQuery)
export class FindOneMeteringPointHandler implements IQueryHandler<FindOneMeteringPointQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneMeteringPointQuery): Promise<MeteringPoint> {
    const meteringPoint = await this.prisma.meteringPoint.findUnique({
      where: { id: query.id },
    });

    if (!meteringPoint) {
      throw new NotFoundException('MeteringPoint not found.');
    }

    return meteringPoint;
  }
}
