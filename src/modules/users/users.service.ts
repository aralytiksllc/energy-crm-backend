// External dependencies
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// Internal dependencies
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { User } from '@/modules/users/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';
import { FindManyUsersQuery } from './queries/find-many-users.query';
import { FindOneUserQuery } from './queries/find-one-user.query';

@Injectable()
export class UsersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(queryParams: QueryParams<User>): Promise<Paged<User>> {
    return this.queryBus.execute(new FindManyUsersQuery(queryParams));
  }

  async findOne(id: number): Promise<User> {
    return this.queryBus.execute(new FindOneUserQuery(id));
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(id, dto));
  }

  async delete(id: number): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
