import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '@/models/customer.model';
import { Contact } from '@/models/contact.model';
import { CurrentUserService } from '@/common/current-user';
import { BaseCommandHandler } from '@/common/cqrs/base-command.handler';
import { CreateCustomerCommand } from './create-customer.command';
import { ForbiddenException } from '@nestjs/common';
import { SequelizeRepository } from '@nestjs/sequelize';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler extends BaseCommandHandler<
  Customer,
  CreateCustomerCommand
> {
  private defaultOptions = {
      include: [Contact],
    }

  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
    private readonly currentUserService: CurrentUserService,
  ) {
    super(customerModel, currentUserService);
  }

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const options = Object.assign({}, command.dto, this.defaultOptions)

    const customer = await this.customerModel.create(command.dto, options);

    return customer;
  }
}
