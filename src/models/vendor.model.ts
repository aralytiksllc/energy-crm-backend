import {
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  Default,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table
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

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
