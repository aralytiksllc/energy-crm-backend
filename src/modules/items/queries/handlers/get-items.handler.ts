import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paging } from '@/common/paging';
import { Item } from '../../entities/item.entity';
import { GetItemsQuery } from '../impl/get-items.query';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler implements IQueryHandler<GetItemsQuery> {
  constructor(
    @InjectRepository(Item) protected readonly repository: Repository<Item>,
  ) {}

  async execute(query: GetItemsQuery): Promise<Paging<Item>> {
    const findOptions = query.toFindOptions();

    const [items, total] = await this.repository.findAndCount(findOptions);

    return new Paging(items, total);
  }
}
