import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { GetUserByIdHandler } from './queries/handlers/get-user-by-id.handler';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';
import { UsersController } from './users.controller';
import { User } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User]), CqrsModule],
  controllers: [UsersController],
  providers: [
    GetUsersHandler,
    GetUserByIdHandler,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
  ],
})
export class UsersModule {}
