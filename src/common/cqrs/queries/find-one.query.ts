import { Model, FindOptions, InferAttributes } from 'sequelize';

export class FindOneQuery<TModel extends Model> {
  constructor(
    public readonly id: number,
    public readonly options: Omit<
      FindOptions<InferAttributes<TModel>>,
      'where'
    > = { raw: true },
  ) {}
}
