// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Role } from '@/prisma/prisma.client';
import { RoleCreatedEvent } from '../events/role-created.event';
import { CreateRoleCommand } from './create-role.command';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler
  implements ICommandHandler<CreateRoleCommand, Role>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateRoleCommand): Promise<Role> {
    const role = await this.prismaService.client.role.create({
      data: { ...command.dto },
    });

    this.eventBus.publish(new RoleCreatedEvent(role));

    return role;
  }
}
