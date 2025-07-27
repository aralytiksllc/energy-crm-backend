// External dependencies
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// Internal dependencies
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindManyUserQuery } from './queries/find-many-users.query';
import { FindOneUserQuery } from './queries/find-one-user.query';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(queryParams: QueryParams<User>): Promise<Paged<User>> {
    const query = new FindManyUserQuery(queryParams);
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
