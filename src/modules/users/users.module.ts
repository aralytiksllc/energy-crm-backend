import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindManyUsersHandler } from './queries/find-many-users.handler';
import { FindOneUserHandler } from './queries/find-one-user.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    FindManyUsersHandler,
    FindOneUserHandler,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
