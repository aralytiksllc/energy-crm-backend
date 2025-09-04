// External
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { type Role } from '@/common/prisma/prisma.client';
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
  ): Promise<Paginate<Role>> {
    return this.roleService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.delete(id);
  }
}
