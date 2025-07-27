// External dependencies
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CqrsModule } from '@nestjs/cqrs';

// Internal dependencies
import { User } from './entities/user.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { FindManyUserHandler } from './queries/find-many-users.handler';
import { FindOneUserHandler } from './queries/find-one-user.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, PasswordReset]), CqrsModule],
  controllers: [UserController],
  providers: [
    // Query Handlers
    FindManyUserHandler,
    FindOneUserHandler,

    // Command Handlers
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,

    // Others
    UserService,
  ],
  exports: [UserService, MikroOrmModule],
})
export class UserModule {}
