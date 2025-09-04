// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Customer } from '@/common/prisma/prisma.client';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';
import { DeleteCustomerCommand } from './delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand, Customer>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<Customer> {
    const customer = await this.prisma.client.customer.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new CustomerDeletedEvent(customer));

    return customer;
  }
}
