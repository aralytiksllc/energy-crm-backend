// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Customer } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { CustomerCreatedEvent } from '../events/customer-created.event';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const customer = await this.prismaService.customer.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new CustomerCreatedEvent(customer));

    return customer;
  }
}
