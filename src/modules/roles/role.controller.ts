// External
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Role } from '@/prisma/prisma.client';
import { CreateRoleDto } from './dtos/create-role.dto';
import { FindManyRolesDto } from './dtos/find-many-roles.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { FindManyRolesPipe } from './pipes/find-many-roles.pipe';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findMany(
    @Query(FindManyRolesPipe) dto: FindManyRolesDto,
  ): Promise<Paged<Role>> {
    return this.roleService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRoleDto): Promise<Role> {
    return this.roleService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Role> {
    return this.roleService.delete(+id);
  }
}
