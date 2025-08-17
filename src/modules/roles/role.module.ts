// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateRoleHandler } from './commands/create-role.handler';
import { DeleteRoleHandler } from './commands/delete-role.handler';
import { FindManyRolesPipe } from './pipes/find-many-roles.pipe';
import { FindManyRolesHandler } from './queries/find-many-roles.handler';
import { FindOneRoleHandler } from './queries/find-one-role.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateRoleHandler } from './commands/update-role.handler';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleSeed } from './role.seed';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [RoleController],
  providers: [
    FindManyRolesPipe,
    FindManyRolesHandler,
    FindOneRoleHandler,
    CreateRoleHandler,
    UpdateRoleHandler,
    DeleteRoleHandler,
    RoleService,
    RoleSeed,
  ],
  exports: [RoleService],
})
export class RoleModule {}
