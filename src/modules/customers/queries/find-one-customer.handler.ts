// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Customer } from '@/prisma/prisma.client';
import { FindOneCustomerQuery } from './find-one-customer.query';

@QueryHandler(FindOneCustomerQuery)
export class FindOneCustomerHandler
  implements IQueryHandler<FindOneCustomerQuery, Customer>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneCustomerQuery): Promise<Customer> {
    return await this.prismaService.client.customer.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
