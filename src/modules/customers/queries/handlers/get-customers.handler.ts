import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paging } from '@/common/paging';
import { Customer } from '../../entities/customer.entity';
import { GetCustomersQuery } from '../impl/get-customers.query';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(
    @InjectRepository(Customer)
    protected readonly repository: Repository<Customer>,
  ) {}

  async execute(query: GetCustomersQuery): Promise<Paging<Customer>> {
    const findOptions = query.toFindOptions();

    const [items, total] = await this.repository.findAndCount(findOptions);

    return new Paging(items, total);
  }
}
