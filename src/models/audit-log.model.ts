import {
  Table,
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table
export class AuditLog extends BaseModel<AuditLog> {
  @AllowNull(false)
  @Column(DataType.STRING)
  action: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  resource: string;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  authorId: Nullable<number>;

  @BelongsTo(() => User, 'authorId')
  author: Nullable<User>;

  @AllowNull(true)
  @Column(DataType.JSONB)
  data: Nullable<Record<string, unknown>>;

  @AllowNull(true)
  @Column(DataType.JSONB)
  previousData: Nullable<Record<string, unknown>>;

  @AllowNull(true)
  @Column(DataType.JSONB)
  meta: Nullable<Record<string, unknown>>;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt!: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt!: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  createdById!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  updatedById!: number;

  @BelongsTo(() => User, 'createdById')
  createdBy: Nullable<User>;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: Nullable<User>;
} 