import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler } from './queries/find-many-users.handler';
import { GetUserByIdHandler } from './queries/find-one-user.handler';
import { GetUserByEmailHandler } from './queries/get-user-by-email.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    GetUsersHandler,
    GetUserByIdHandler,
    GetUserByEmailHandler,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
  ],
  exports: [UsersService],
})
export class UsersModule {}
