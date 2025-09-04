// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Customer } from '@/prisma/prisma.client';
import { CustomerCreatedEvent } from '../events/customer-created.event';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand, Customer>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const customer = await this.prismaService.client.customer.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new CustomerCreatedEvent(customer));

    return customer;
  }
}
