// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { ConsumptionFile } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyConsumptionsQuery } from './find-many-consumptions.query';

@QueryHandler(FindManyConsumptionsQuery)
export class FindManyConsumptionsHandler implements IQueryHandler<FindManyConsumptionsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyConsumptionsQuery): Promise<Paged<ConsumptionFile>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.consumptionFile.findMany(findOptions),
      this.prismaService.consumptionFile.count({ where: findOptions.where }),
    ]);

    return new Paged(rows, count, 1, 1);
  }
}
