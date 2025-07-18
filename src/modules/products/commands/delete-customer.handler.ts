// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal dependencies
import { Customer } from '@/modules/products/entities/customer.entity';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';
import { DeleteCustomerCommand } from './delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<Customer> {
    const { id, options } = command;

    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new Error(`Customer with id ${id} not found`);
    }

    await this.customerRepository.remove(customer);

    this.eventBus.publish(new CustomerDeletedEvent(customer));

    return customer;
  }
}
