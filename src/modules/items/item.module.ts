import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetItemsHandler } from './queries/handlers/get-items.handler';
import { GetItemByIdHandler } from './queries/handlers/get-item-by-id.handler';
import { CreateItemHandler } from './commands/handlers/create-item.handler';
import { UpdateItemHandler } from './commands/handlers/update-item.handler';
import { DeleteItemHandler } from './commands/handlers/delete-item.handler';
import { ItemController } from './item.controller';
import { Item } from './entities/item.entity';
import { ItemPhoto } from './entities/item-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemPhoto]), CqrsModule],
  controllers: [ItemController],
  providers: [
    GetItemsHandler,
    GetItemByIdHandler,
    CreateItemHandler,
    UpdateItemHandler,
    DeleteItemHandler,
  ],
})
export class ItemModule {}
