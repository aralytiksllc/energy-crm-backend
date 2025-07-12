import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '@/entities/customer.entity';
import { CustomerUpdatedEvent } from '../events/customer-updated.event';
import { UpdateCustomerCommand } from './update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const { id, dto } = command;

    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new Error(`Customer with id ${id} not found`);
    }

    const updatedCustomer = this.customerRepository.merge(customer, dto);

    await this.customerRepository.save(updatedCustomer);

    this.eventBus.publish(new CustomerUpdatedEvent(updatedCustomer));

    return updatedCustomer;
  }
}
