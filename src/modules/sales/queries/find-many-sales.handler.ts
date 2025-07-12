import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paged } from '@/common/paged';
import { Customer } from '@/entities/customer.entity';
import { FindManySalesQuery } from './find-many-sales.query';

@QueryHandler(FindManySalesQuery)
export class FindManySalesHandler implements IQueryHandler<FindManySalesQuery> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(query: FindManySalesQuery): Promise<Paged<Customer>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.customerRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
