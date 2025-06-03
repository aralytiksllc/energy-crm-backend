import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Paging } from '@/common/paged';
import { Customer } from '@/models/customer.model';
import { GetCustomersQuery } from '../queries/get-customers.query';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(
    @InjectModel(Customer)
    protected readonly customerModel: typeof Customer,
  ) {}

  async execute(query: GetCustomersQuery): Promise<Paging<Customer>> {
    const sequelizeOptions = query.toSequelizeOptions();

    const data = await this.customerModel.findAndCountAll(sequelizeOptions);

    return new Paging(data.rows, data.count);
  }
}
