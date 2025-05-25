import {
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';
import { BaseModel } from './base.model';

@Table
export class User extends BaseModel<User> implements IUser {
  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Exclude()
  @Column(DataType.STRING)
  password: string;

  @AllowNull
  @Column(DataType.DATEONLY)
  dateOfBirth: Nullable<Date>;

  @AllowNull
  @Column(DataType.DATEONLY)
  dateOfJoining: Nullable<Date>;

  @AllowNull
  @Column(DataType.JSONB)
  settings: Nullable<Record<string, unknown>>;

  @AllowNull
  @Column(DataType.TEXT)
  notes: Nullable<string>;

  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  createdById: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  updatedById: number;

  @BelongsTo(() => User)
  createdBy: User;

  @BelongsTo(() => User)
  updatedBy: User;
}
