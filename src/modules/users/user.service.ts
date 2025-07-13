// External dependencies
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from '@prisma/client';

// Internal dependencies
import { Paged } from '@/common/paged/paged.impl';
import { QueryParamsDto } from '@/common/query/dtos/query-params.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';
import { FindManyUsersQuery } from './queries/find-many-users.query';
import { FindOneUserQuery } from './queries/find-one-user.query';

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: QueryParamsDto): Promise<Paged<User>> {
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

  async delete(id: number): Promise<void> {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute(command);
  }
}
