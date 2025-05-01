import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { GetItemByIdQuery } from '../impl/get-item-by-id.query';

@QueryHandler(GetItemByIdQuery)
export class GetItemByIdHandler implements IQueryHandler<GetItemByIdQuery> {
  constructor(
    @InjectRepository(Item) protected readonly repository: Repository<Item>,
  ) {}

  async execute(query: GetItemByIdQuery): Promise<Item> {
    const where = { id: query.id } as FindOptionsWhere<Item>;
    return await this.repository.findOneByOrFail(where);
  }
}
