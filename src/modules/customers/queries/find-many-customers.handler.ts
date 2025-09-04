// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Customer } from '@/common/prisma/prisma.client';
import { FindManyCustomersQuery } from './find-many-customers.query';

@QueryHandler(FindManyCustomersQuery)
export class FindManyCustomersHandler
  implements IQueryHandler<FindManyCustomersQuery, Paginate<Customer>>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyCustomersQuery): Promise<Paginate<Customer>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prisma.client.$transaction([
      this.prisma.client.customer.findMany(findOptions),
      this.prisma.client.customer.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
