// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Customer } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';
import { DeleteCustomerCommand } from './delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<DeleteCustomerCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<Customer> {
    const customer = await this.prismaService.customer.delete({
      where: { id: command.id },
    });

    this.eventBus.publish(new CustomerDeletedEvent(customer));

    return customer;
  }
}
