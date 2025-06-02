import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { BaseModel } from '../common/cqrs/base.model';
import { User } from './user.model';

@Table
export class AuditLog extends BaseModel<AuditLog> {
  @Column(DataType.STRING)
  action: string;

  @Column(DataType.STRING)
  resource: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @AllowNull
  @Column(DataType.JSONB)
  data: Nullable<Record<string, unknown>>;

  @AllowNull
  @Column(DataType.JSONB)
  previousData: Nullable<Record<string, unknown>>;

  @AllowNull
  @Column(DataType.JSONB)
  meta: Nullable<Record<string, unknown>>;

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
