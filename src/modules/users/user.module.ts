// External dependencies
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyUsersHandler } from './queries/find-many-users.handler';
import { FindOneUserHandler } from './queries/find-one-user.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    PrismaService,

    // Query Handlers
    FindManyUsersHandler,
    FindOneUserHandler,

    // Command Handlers
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,

    // Others
    UserService,
  ],
  exports: [
    // Others
    UserService,
  ],
})
export class UserModule {}
