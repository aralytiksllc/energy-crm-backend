// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Customer } from '@/prisma/prisma.client';
import { FindManyCustomersQuery } from './find-many-customers.query';

@QueryHandler(FindManyCustomersQuery)
export class FindManyCustomersHandler
  implements IQueryHandler<FindManyCustomersQuery, Paginate<Customer>>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyCustomersQuery): Promise<Paginate<Customer>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.client.$transaction([
      this.prismaService.client.customer.findMany(findOptions),
      this.prismaService.client.customer.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
