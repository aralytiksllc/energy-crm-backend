import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Paging } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { User } from '@/models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DeleteUserCommand } from './commands/delete-user.command';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { GetUserByIdQuery } from './queries/find-one-user.query';
import { GetUsersQuery } from './queries/find-many-users.query';
import { GetUserByEmailQuery } from './queries/get-user-by-email.query';

@Injectable()
export class UsersService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(queryParams: QueryParams<User>): Promise<Paging<User>> {
    return this.queryBus.execute(new GetUsersQuery(queryParams));
  }

  async findOne(id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
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
