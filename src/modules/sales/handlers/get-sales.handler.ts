import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Paging } from '@/common/paged';
import { Sale } from '@/models/sale.model';
import { GetSalesQuery } from '../queries/get-sales.query';

@QueryHandler(GetSalesQuery)
export class GetSalesHandler implements IQueryHandler<GetSalesQuery> {
  constructor(
    @InjectModel(Sale)
    protected readonly saleModel: typeof Sale,
  ) {}

  async execute(query: GetSalesQuery): Promise<Paging<Sale>> {
    const sequelizeOptions = query.toSequelizeOptions();

    const { rows, count } =
      await this.saleModel.findAndCountAll(sequelizeOptions);

    return new Paging(rows, count);
  }
}
