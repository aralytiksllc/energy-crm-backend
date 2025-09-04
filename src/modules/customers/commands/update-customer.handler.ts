// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Customer } from '@/common/prisma/prisma.client';
import { CustomerUpdatedEvent } from '../events/customer-updated.event';
import { UpdateCustomerCommand } from './update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand, Customer>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const customer = await this.prisma.client.customer.update({
      where: { id: command.id },
      data: { ...command.dto },
    });

    this.eventBus.publish(new CustomerUpdatedEvent(customer));

    return customer;
  }
}
