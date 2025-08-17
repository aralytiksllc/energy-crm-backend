// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { User } from '@/prisma/prisma.client';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateUserDto } from './dtos/create-user.dto';
import { DeleteUserCommand } from './commands/delete-user.command';
import { FindManyUsersDto } from './dtos/find-many-users.dto';
import { FindManyUsersQuery } from './queries/find-many-users.query';
import { FindOneUserQuery } from './queries/find-one-user.query';
import { UpdateUserCommand } from './commands/update-user.command';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: FindManyUsersDto): Promise<Paged<User>> {
    const query = new FindManyUsersQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<User> {
    const query = new FindOneUserQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const command = new CreateUserCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const command = new UpdateUserCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<User> {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute(command);
  }
}
