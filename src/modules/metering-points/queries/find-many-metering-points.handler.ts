// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { MeteringPoint } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyMeteringPointsQuery } from './find-many-metering-points.query';

@QueryHandler(FindManyMeteringPointsQuery)
export class FindManyMeteringPointsHandler implements IQueryHandler<FindManyMeteringPointsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyMeteringPointsQuery): Promise<Paged<MeteringPoint>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.meteringPoint.findMany(findOptions),
      this.prismaService.meteringPoint.count({ where: findOptions.where }),
    ]);

    return new Paged(rows, count, 1, 1);
  }
}
