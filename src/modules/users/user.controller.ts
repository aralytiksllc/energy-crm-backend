// External dependencies
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';

// Internal dependencies
import { Paged } from '@/common/paged/paged.impl';
import { QueryParamsDto } from '@/common/query/dtos/query-params.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMany(@Query() dto: QueryParamsDto): Promise<Paged<User>> {
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
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.delete(+id);
  }
}
