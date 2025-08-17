// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { Customer } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneCustomerQuery } from './find-one-customer.query';

@QueryHandler(FindOneCustomerQuery)
export class FindOneCustomerHandler
  implements IQueryHandler<FindOneCustomerQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneCustomerQuery): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: query.id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    return customer;
  }
}
