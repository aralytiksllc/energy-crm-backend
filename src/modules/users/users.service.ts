import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationResult } from '@/common/pagination/pagination.interfaces';
import { QueryParams } from '@/common/query/query-params';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { GetUserByIdQuery } from './queries/impl/get-user-by-id.query';
import { GetUsersQuery } from './queries/impl/get-users.query';
import { User } from '@/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(
    queryParams: QueryParams<User>,
  ): Promise<PaginationResult<User>> {
    return this.queryBus.execute(new GetUsersQuery(queryParams));
  }

  async findOne(id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(id, dto));
  }

  async delete(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
