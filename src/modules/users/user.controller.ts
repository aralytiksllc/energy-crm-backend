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
  Req,
} from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { User } from '@/prisma/prisma.client';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindManyUsersDto } from './dtos/find-many-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindManyUsersPipe } from './pipes/find-many-users.pipe';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMany(
    @Query(FindManyUsersPipe) dto: FindManyUsersDto,
  ): Promise<Paged<User>> {
    return this.userService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<User> {
    return this.userService.delete(+id);
  }

  @Get('me')
  async getProfile(@Req() req) {
    const userId = +req.user.sub;
    return this.userService.findOne(userId);
  }
}
