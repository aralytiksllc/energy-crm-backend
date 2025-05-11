import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { GetCustomerByIdQuery } from '../impl/get-customer-by-id.query';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdHandler
  implements IQueryHandler<GetCustomerByIdQuery>
{
  constructor(
    @InjectRepository(Customer)
    protected readonly repository: Repository<Customer>,
  ) {}

  async execute(query: GetCustomerByIdQuery): Promise<Customer> {
    const where = { id: query.id } as FindOptionsWhere<Customer>;
    return await this.repository.findOneByOrFail(where);
  }
}
