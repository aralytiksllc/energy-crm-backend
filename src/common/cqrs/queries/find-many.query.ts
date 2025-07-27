import { BaseEntity } from '@/common/cqrs/base.entity';
import { Query, QueryParams } from '@/common/query';

export class FindManyQuery<TEntity extends BaseEntity> extends Query<any, any> {
  constructor(params: QueryParams<any>) {
    super(params as any);
  }
}
