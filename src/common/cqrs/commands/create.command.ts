import { Model, CreateOptions, InferAttributes } from 'sequelize';

export class CreateCommand<TDto, TModel extends Model> {
  constructor(
    public readonly dto: TDto,
    public readonly options?: CreateOptions<InferAttributes<TModel>>,
  ) {}
}
