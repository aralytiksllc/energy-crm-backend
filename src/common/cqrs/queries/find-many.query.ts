import { BaseEntity } from '@/common/cqrs/base.entity';
import { Query, QueryParams } from '@/common/query';

export class FindManyQuery<TEntity extends BaseEntity> extends Query<TEntity> {
  constructor(params: QueryParams<TEntity>) {
    super(params);
  }
}
