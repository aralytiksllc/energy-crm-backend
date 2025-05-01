import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { GetItemsQuery } from '../impl/get-items.query';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler implements IQueryHandler<GetItemsQuery> {
  constructor(
    @InjectRepository(Item) protected readonly repository: Repository<Item>,
  ) {}

  async execute(query: GetItemsQuery): Promise<Item[]> {
    return await this.repository.find(query);
  }
}
