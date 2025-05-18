import { Column, DataType, AllowNull, Model } from 'sequelize-typescript';

export abstract class Auditable extends Model {
  @AllowNull
  @Column(DataType.UUID)
  createdById: string | null;

  @AllowNull
  @Column(DataType.UUID)
  updatedById: string | null;
}
