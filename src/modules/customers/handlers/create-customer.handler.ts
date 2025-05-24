import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '@/models/customer.model';
import { Contact } from '@/models/contact.model';
import { CreateCustomerCommand } from '../commands/create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const customer = await this.customerModel.create(command.dto as any, {
      include: [Contact],
    });

    return customer;
  }
}
