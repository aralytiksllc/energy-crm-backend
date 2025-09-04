// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Customer } from '@/common/prisma/prisma.client';
import { FindOneCustomerQuery } from './find-one-customer.query';

@QueryHandler(FindOneCustomerQuery)
export class FindOneCustomerHandler
  implements IQueryHandler<FindOneCustomerQuery, Customer>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneCustomerQuery): Promise<Customer> {
    return await this.prisma.client.customer.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
