import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '@/models/customer.model';
import { UpdateCustomerCommand } from '../impl/update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async execute(command: any): Promise<Customer> {
    const customer = await this.customerModel.findByPk(command.id);

    if (!customer) throw new Error(`Customer with ID ${command.id} not found.`);

    customer.set(command.dto);

    await customer.save();

    return customer;
  }
}
