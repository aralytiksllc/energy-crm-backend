import {
  Table,
  Column,
  DataType,
  Default,
  AllowNull,
  Unique,
  BelongsTo,
} from 'sequelize-typescript';
import { NonAttribute } from 'sequelize';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table({ tableName: 'vendors' })
export class Vendor extends BaseModel<Vendor> {
  @Unique
  @Column(DataType.STRING)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  description?: string;

  @AllowNull
  @Column(DataType.STRING)
  contactEmail?: string;

  @AllowNull
  @Column(DataType.STRING)
  contactPhone?: string;

  @AllowNull
  @Column(DataType.STRING)
  website?: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @AllowNull
  @Column(DataType.JSON)
  settings?: Record<string, any>;

  @BelongsTo(() => User, { foreignKey: 'createdById' })
  createdBy: User;

  @BelongsTo(() => User, { foreignKey: 'updatedById' })
  updatedBy: User;
}
