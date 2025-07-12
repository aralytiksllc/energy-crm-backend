// External dependencies
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal dependencies
import { Customer } from '../entities/customer.entity';
import { CustomerCreatedEvent } from '../events/customer-created.event';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const { dto } = command;

    const entity = this.customerRepository.create(dto);

    const customer = await this.customerRepository.save(entity);

    this.eventBus.publish(new CustomerCreatedEvent(customer));

    return customer;
  }
}
