import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationResult } from '@/common/pagination/pagination.interfaces';
import { QueryParams } from '@/common/query/query-params';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { DeleteItemCommand } from './commands/impl/delete-item.command';
import { CreateItemCommand } from './commands/impl/create-item.command';
import { UpdateItemCommand } from './commands/impl/update-item.command';
import { GetItemByIdQuery } from './queries/impl/get-item-by-id.query';
import { GetItemsQuery } from './queries/impl/get-items.query';
import { Item } from './entities/item.entity';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(
    @Query() queryParams: QueryParams<Item>,
  ): Promise<PaginationResult<Item>> {
    return this.queryBus.execute(new GetItemsQuery(queryParams));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.queryBus.execute(new GetItemByIdQuery(id));
  }

  @Post()
  async create(@Body() dto: CreateItemDto): Promise<Item> {
    return this.commandBus.execute(new CreateItemCommand(dto));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateItemDto,
  ): Promise<Item> {
    return this.commandBus.execute(new UpdateItemCommand(id, dto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteItemCommand(id));
  }
}
