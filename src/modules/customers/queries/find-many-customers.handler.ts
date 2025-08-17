// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Customer } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyCustomersQuery } from './find-many-customers.query';

@QueryHandler(FindManyCustomersQuery)
export class FindManyCustomersHandler implements IQueryHandler<FindManyCustomersQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyCustomersQuery): Promise<Paged<Customer>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.customer.findMany(findOptions),
      this.prismaService.customer.count({ where: findOptions.where }),
    ]);

    return new Paged(rows, count, 1, 1);
  }
}
