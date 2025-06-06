import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../../entities/user.entity';
import { FindManyUsersHandler } from './queries/find-many-users.handler';
import { FindOneUserHandler } from './queries/find-one-user.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UsersController],
  providers: [
    // Query Handlers
    FindManyUsersHandler,
    FindOneUserHandler,

    // Command Handlers
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,

    // Others
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
