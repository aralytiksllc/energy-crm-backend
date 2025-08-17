// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import type { Customer } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { CustomerUpdatedEvent } from '../events/customer-updated.event';
import { UpdateCustomerCommand } from './update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const customer = await this.prismaService.customer.update({
      where: { id: command.id },
      data: command.dto,
    });

    this.eventBus.publish(new CustomerUpdatedEvent(customer));

    return customer;
  }
}
