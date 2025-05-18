import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../../models/customer.model';
import { DeleteCustomerCommand } from '../impl/delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    await this.customerModel.destroy({
      where: { id: command.id },
    });
  }
}
