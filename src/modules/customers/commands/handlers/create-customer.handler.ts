import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../../models/customer.model';
import { CreateCustomerCommand } from '../impl/create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    return await this.customerModel.create(command.dto);
  }
}
