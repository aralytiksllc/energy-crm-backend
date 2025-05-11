import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { UpdateCustomerCommand } from '../impl/update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const where = { id: command.id } as FindOptionsWhere<Customer>;
    const entity = await this.repository.findOneByOrFail(where);

    Object.assign(entity, command.dto);
    return this.repository.save(entity);
  }
}
