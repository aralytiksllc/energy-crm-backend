import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, PaginationResult } from '@/common/pagination';
import { Item } from '../../entities/item.entity';
import { GetItemsQuery } from '../impl/get-items.query';

@QueryHandler(GetItemsQuery)
export class GetItemsHandler implements IQueryHandler<GetItemsQuery> {
  constructor(
    @InjectRepository(Item) protected readonly repository: Repository<Item>,
  ) {}

  async execute(query: GetItemsQuery): Promise<PaginationResult<Item>> {
    const pagination = new Pagination(query);

    const findOptions = query.toFindOptions();

    const [items, total] = await this.repository.findAndCount(findOptions);

    return pagination.getResult(items, total);
  }
}
