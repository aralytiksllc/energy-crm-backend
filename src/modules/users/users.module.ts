import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { GetUserByIdHandler } from './queries/handlers/get-user-by-id.handler';
import { GetUserByEmailHandler } from './queries/handlers/get-user-by-email.handler';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';
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
