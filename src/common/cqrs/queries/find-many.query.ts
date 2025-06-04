import { Model } from 'sequelize';
import { Query, QueryParams } from '@/common/query';

export class FindManyQuery<TModel extends Model> extends Query<TModel> {
  constructor(params: QueryParams<TModel>) {
    super(params);
  }
}
