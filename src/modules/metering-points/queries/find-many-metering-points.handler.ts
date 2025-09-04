// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Prisma, type MeteringPoint } from '@/prisma/prisma.client';
import { FindManyMeteringPointsQuery } from './find-many-metering-points.query';

@QueryHandler(FindManyMeteringPointsQuery)
export class FindManyMeteringPointsHandler
  implements IQueryHandler<FindManyMeteringPointsQuery>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
  ) {}

  async execute(
    query: FindManyMeteringPointsQuery,
  ): Promise<Paginate<MeteringPoint>> {
    const findOptions: Prisma.MeteringPointFindManyArgs = {
      ...query.dto.findOptions,
      include: { branch: true },
    };

    const [rows, count] = await this.prismaService.client.$transaction([
      this.prismaService.client.meteringPoint.findMany(findOptions),
      this.prismaService.client.meteringPoint.count({
        where: findOptions.where,
      }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
