import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetItemsQuery } from './queries/impl/get-items.query';
import { GetItemByIdQuery } from './queries/impl/get-item-by-id.query';
import { CreateItemCommand } from './commands/impl/create-item.command';
import { UpdateItemCommand } from './commands/impl/update-item.command';
import { DeleteItemCommand } from './commands/impl/delete-item.command';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Controller('items')
export class ItemController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.queryBus.execute(new GetItemsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.queryBus.execute(new GetItemByIdQuery(id));
  }

  @Post()
  async create(@Body() dto: CreateItemDto): Promise<Item> {
    return this.commandBus.execute(new CreateItemCommand(dto));
  }

  @Put(':id')
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
