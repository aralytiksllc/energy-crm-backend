import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paging } from '@/common/paging';
import { Sale } from '../../entities/sale.entity';
import { GetSalesQuery } from '../impl/get-sales.query';

@QueryHandler(GetSalesQuery)
export class GetSalesHandler implements IQueryHandler<GetSalesQuery> {
  constructor(
    @InjectRepository(Sale) protected readonly repository: Repository<Sale>,
  ) {}

  async execute(query: GetSalesQuery): Promise<Paging<Sale>> {
    const findOptions = query.toFindOptions();

    const [sales, total] = await this.repository.findAndCount(findOptions);

    return new Paging(sales, total);
  }
}
