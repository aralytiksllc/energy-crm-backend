import {
  Table,
  Column,
  DataType,
  Default,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { BaseModel } from './base.model';

@Table({ tableName: 'users' })
export class User extends BaseModel<User> {
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

  @Column(DataType.DATEONLY)
  dateOfBirth: string;

  @Column(DataType.DATEONLY)
  dateOfJoining: string;

  @AllowNull
  @Column(DataType.JSON)
  settings: Record<string, any>;

  @AllowNull
  @Column(DataType.TEXT)
  notes: string | null;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;
}
