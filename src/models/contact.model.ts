import {
  Table,
  Column,
  DataType,
  AllowNull,
  Default,
  IsEmail,
  BelongsTo,
} from 'sequelize-typescript';
import { IContact } from '../interfaces/contact.interface';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table
export class Contact extends BaseModel<Contact> implements IContact {
  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @AllowNull
  @Column(DataType.STRING)
  title: string;

  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @AllowNull
  @Column(DataType.STRING)
  phone: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isPrimary: boolean;

  @AllowNull
  @Column(DataType.TEXT)
  notes: string;

  @Column(DataType.STRING)
  contactableType: string;

  @Column(DataType.INTEGER)
  contactableId: number;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
