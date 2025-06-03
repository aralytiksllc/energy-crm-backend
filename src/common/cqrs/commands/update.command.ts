import { Model, UpdateOptions, InferAttributes } from 'sequelize';

export class UpdateCommand<TDto, TModel extends Model> {
  constructor(
    public readonly id: number,
    public readonly dto: TDto,
    public readonly options?: UpdateOptions<InferAttributes<TModel>>,
  ) {}
}
