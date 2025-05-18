import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from '../../models/sale.model';
import { GetSaleByIdQuery } from '../impl/get-sale-by-id.query';

@QueryHandler(GetSaleByIdQuery)
export class GetSaleByIdHandler implements IQueryHandler<GetSaleByIdQuery> {
  constructor(
    @InjectModel(Sale)
    protected readonly saleModel: typeof Sale,
  ) {}

  async execute(query: GetSaleByIdQuery): Promise<Sale> {
    const sale = await this.saleModel.findByPk(query.id);

    if (!sale) throw new Error(`Sale with ID ${query.id} not found`);

    return sale;
  }
}
