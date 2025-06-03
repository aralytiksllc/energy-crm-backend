import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Model, Column, DataType } from 'sequelize-typescript';

export abstract class BaseModel<T extends Model> extends Model<
  InferAttributes<T>,
  InferCreationAttributes<T>
> {
  @Column(DataType.INTEGER)
  createdById?: number;

  @Column(DataType.INTEGER)
  updatedById?: number;
}
