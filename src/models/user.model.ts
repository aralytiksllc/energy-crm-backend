import {
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { BaseModel } from '@/common/cqrs/base.model';
import { Hash } from '@/common/hash';

@Table({ tableName: 'users', timestamps: true })
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
  createdBy?: User;

  @BelongsTo(() => User)
  updatedBy?: User;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      user.password = await Hash.make(user.password);
    }
  }
}
