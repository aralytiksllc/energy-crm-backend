import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Sale } from '../../entities/sale.entity';
import { GetSaleByIdQuery } from '../impl/get-sale-by-id.query';

@QueryHandler(GetSaleByIdQuery)
export class GetSaleByIdHandler implements IQueryHandler<GetSaleByIdQuery> {
  constructor(
    @InjectRepository(Sale) protected readonly repository: Repository<Sale>,
  ) {}

  async execute(query: GetSaleByIdQuery): Promise<Sale> {
    const where = { id: query.id } as FindOptionsWhere<Sale>;
    return await this.repository.findOneByOrFail(where);
  }
}
