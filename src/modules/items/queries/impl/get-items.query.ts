import { Query } from '@/common/query/query';
import { Item } from '../../entities/item.entity';

export class GetItemsQuery extends Query<Item> {
  public readonly relations: string[] = ['vendor'];
}
