import { Model, InferAttributes } from 'sequelize';
import { Query, QueryParams } from '@/common/query';

export class FindManyQuery<TModel extends Model> extends Query<
  InferAttributes<TModel>
> {
  constructor(params: QueryParams<InferAttributes<TModel>>) {
    super(params);
  }
}
