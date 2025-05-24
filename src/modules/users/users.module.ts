import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler } from './handlers/get-users.handler';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { CreateUserHandler } from './handlers/create-user.handler';
import { UpdateUserHandler } from './handlers/update-user.handler';
import { DeleteUserHandler } from './handlers/delete-user.handler';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    GetUsersHandler,
    GetUserByIdHandler,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
  ],
})
export class UsersModule {}
