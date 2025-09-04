// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Customer } from '@/prisma/prisma.client';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';
import { DeleteCustomerCommand } from './delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand, Customer>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<Customer> {
    const customer = await this.prismaService.client.customer.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new CustomerDeletedEvent(customer));

    return customer;
  }
}
