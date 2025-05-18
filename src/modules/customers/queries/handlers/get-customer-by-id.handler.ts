import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../../models/customer.model';
import { GetCustomerByIdQuery } from '../impl/get-customer-by-id.query';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdHandler
  implements IQueryHandler<GetCustomerByIdQuery>
{
  constructor(
    @InjectModel(Customer)
    protected readonly customerModel: typeof Customer,
  ) {}

  async execute(query: GetCustomerByIdQuery): Promise<Customer> {
    const customer = await this.customerModel.findByPk(query.id);

    if (customer === null) {
      throw new Error(`Customer with ID ${query.id} not found.`);
    }

    return customer;
  }
}
