import { Model, AllowNull, Column, DataType } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

export abstract class BaseModel<T extends Model> extends Model<
  InferAttributes<T>,
  InferCreationAttributes<T>
> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  createdById: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  updatedById: number;
}
