import { Model, Column, DataType } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

export abstract class BaseModel<T extends Model> extends Model<
  InferAttributes<T>,
  InferCreationAttributes<T>
> {
  @Column(DataType.INTEGER)
  createdById?: number;

  @Column(DataType.INTEGER)
  updatedById?: number;
}
