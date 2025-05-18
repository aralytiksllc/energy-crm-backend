import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { QueryParams } from '@/common/query/query-params';
import { PaginationResult } from '@/common/pagination/pagination.interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { GetUserByIdQuery } from './queries/impl/get-user-by-id.query';
import { GetUsersQuery } from './queries/impl/get-users.query';
import { User } from './models/user.model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(
    @Query() queryParams: QueryParams<User>,
  ): Promise<PaginationResult<User>> {
    return this.queryBus.execute(new GetUsersQuery(queryParams));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(dto));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(id, dto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
