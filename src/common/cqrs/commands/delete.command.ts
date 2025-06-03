import { Model, DestroyOptions, InferAttributes } from 'sequelize';

export class DeleteCommand<TModel extends Model> {
  constructor(
    public readonly id: number,
    public readonly options?: DestroyOptions<InferAttributes<TModel>>,
  ) {}
}
