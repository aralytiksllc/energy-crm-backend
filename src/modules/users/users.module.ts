// External dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';
import { FindManyUsersHandler } from './queries/find-many-users.handler';
import { FindOneUserHandler } from './queries/find-one-user.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
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
    UsersRepository,
    UsersService,
  ],
  exports: [
    // Others
    UsersRepository,
    UsersService,
  ],
})
export class UsersModule {}
