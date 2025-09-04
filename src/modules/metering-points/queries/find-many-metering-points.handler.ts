// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma, type MeteringPoint } from '@/common/prisma/prisma.client';
import { FindManyMeteringPointsQuery } from './find-many-metering-points.query';

@QueryHandler(FindManyMeteringPointsQuery)
export class FindManyMeteringPointsHandler
  implements IQueryHandler<FindManyMeteringPointsQuery, Paginate<MeteringPoint>>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(
    query: FindManyMeteringPointsQuery,
  ): Promise<Paginate<MeteringPoint>> {
    const findOptions: Prisma.MeteringPointFindManyArgs = {
      ...query.dto.findOptions,
      include: { branch: true },
    };

    const [rows, count] = await this.prisma.client.$transaction([
      this.prisma.client.meteringPoint.findMany(findOptions),
      this.prisma.client.meteringPoint.count({
        where: findOptions.where,
      }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
