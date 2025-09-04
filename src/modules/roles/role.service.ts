// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import type { Role } from '@/prisma/prisma.service';
import { CreateRoleCommand } from './commands/create-role.command';
import { CreateRoleDto } from './dtos/create-role.dto';
import { DeleteRoleCommand } from './commands/delete-role.command';
import { FindManyRolesDto } from './dtos/find-many-roles.dto';
import { FindManyRolesQuery } from './queries/find-many-roles.query';
import { FindOneRoleQuery } from './queries/find-one-role.query';
import { UpdateRoleCommand } from './commands/update-role.command';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: FindManyRolesDto): Promise<Paginate<Role>> {
    const query = new FindManyRolesQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Role> {
    const query = new FindOneRoleQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const command = new CreateRoleCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const command = new UpdateRoleCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<Role> {
    const command = new DeleteRoleCommand(id);
    return this.commandBus.execute(command);
  }
}
