import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseModel } from '../common/cqrs/base.model';
import { User } from './user.model';

@Table
export class Contact extends BaseModel<Contact> {
  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @AllowNull
  @Column(DataType.STRING)
  title: Nullable<string>;

  @Column(DataType.STRING)
  email: string;

  @AllowNull
  @Column(DataType.STRING)
  phone: Nullable<string>;

  @Column(DataType.BOOLEAN)
  isPrimary: boolean;

  @AllowNull
  @Column(DataType.TEXT)
  notes: Nullable<string>;

  @Column(DataType.STRING)
  contactableType: string;

  @Column(DataType.INTEGER)
  contactableId: number;

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
