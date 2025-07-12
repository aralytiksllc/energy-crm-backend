// External dependencies
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

// Internal dependencies
import { Customer } from '@/modules/sales/entities/customer.entity';
import { FindOneCustomerQuery } from './find-one-customer.query';

@QueryHandler(FindOneCustomerQuery)
export class FindOneCustomerHandler
  implements IQueryHandler<FindOneCustomerQuery>
{
  constructor(
    @InjectRepository(Customer)
    protected readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(query: FindOneCustomerQuery): Promise<Nullable<Customer>> {
    const options: FindOneOptions<Customer> = {
      where: { id: query.id },
      ...query.options,
    };

    return this.customerRepository.findOne(options);
  }
}
