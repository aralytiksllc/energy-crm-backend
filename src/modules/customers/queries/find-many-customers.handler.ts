import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paged } from '@/common/paged';
import { Customer } from '../entities/customer.entity';
import { FindManyCustomersQuery } from './find-many-customers.query';

@QueryHandler(FindManyCustomersQuery)
export class FindManyCustomersHandler
  implements IQueryHandler<FindManyCustomersQuery>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(query: FindManyCustomersQuery): Promise<Paged<Customer>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.customerRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
