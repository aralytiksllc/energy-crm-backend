// External
import { NotFoundException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

// Internal
import type { Consumption } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneConsumptionQuery } from './find-one-consumption.query';

@QueryHandler(FindOneConsumptionQuery)
export class FindOneConsumptionHandler implements IQueryHandler<FindOneConsumptionQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneConsumptionQuery): Promise<Consumption> {
    const consumption = await this.prisma.consumption.findUnique({
      where: { id: query.id },
    });

    if (!consumption) {
      throw new NotFoundException('Consumption not found.');
    }

    return consumption;
  }
}
