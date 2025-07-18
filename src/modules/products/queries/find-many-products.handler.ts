// External dependencies
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal dependencies
import { Paged } from '@/common/paged';
import { Customer } from '@/modules/products/entities/customer.entity';
import { FindManyProductsQuery } from './find-many-products.query';

@QueryHandler(FindManyProductsQuery)
export class FindManyProductsHandler
  implements IQueryHandler<FindManyProductsQuery>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(query: FindManyProductsQuery): Promise<Paged<Customer>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.customerRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
