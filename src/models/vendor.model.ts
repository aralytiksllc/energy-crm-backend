import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { User } from './user.model';
import { Product } from './product.model';

@Table
export class Vendor extends BaseModel<Vendor> {
  @Column(DataType.STRING)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  description: Nullable<string>;

  @AllowNull
  @Column(DataType.STRING)
  contactEmail: Nullable<string>;

  @AllowNull
  @Column(DataType.STRING)
  contactPhone: Nullable<string>;

  @AllowNull
  @Column(DataType.STRING)
  website: Nullable<string>;

  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @AllowNull
  @Column(DataType.JSONB)
  settings: Nullable<Record<string, unknown>>;

  @HasMany(() => Product)
  products: Product[];

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
