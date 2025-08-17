// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateUserHandler } from './commands/create-user.handler';
import { DeleteUserHandler } from './commands/delete-user.handler';
import { FindManyUsersPipe } from './pipes/find-many-users.pipe';
import { FindManyUsersHandler } from './queries/find-many-users.handler';
import { FindOneUserHandler } from './queries/find-one-user.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateUserHandler } from './commands/update-user.handler';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSeed } from './user.seed';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [UserController],
  providers: [
    FindManyUsersPipe,
    FindManyUsersHandler,
    FindOneUserHandler,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    UserService,
    UserSeed,
  ],
  exports: [UserService],
})
export class UserModule {}
