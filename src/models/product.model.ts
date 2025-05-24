import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductUnit } from '../enums/product-unit.enum';
import { BaseModel } from './base.model';
import { User } from './user.model';
import { Vendor } from './vendor.model';

@Table
export class Product extends BaseModel<Product> {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.ENUM(...Object.values(ProductUnit)))
  unit: ProductUnit;

  @Column(DataType.STRING)
  sku: string;

  @AllowNull
  @Column(DataType.DECIMAL(10, 2))
  length: Nullable<number>;

  @AllowNull
  @Column(DataType.DECIMAL(10, 2))
  width: Nullable<number>;

  @AllowNull
  @Column(DataType.DECIMAL(10, 2))
  height: Nullable<number>;

  @AllowNull
  @Column(DataType.DECIMAL(10, 2))
  weight: Nullable<number>;

  @AllowNull
  @Column(DataType.STRING)
  upc: Nullable<string>;

  @AllowNull
  @Column(DataType.STRING)
  mpn: Nullable<string>;

  @AllowNull
  @Column(DataType.STRING)
  ean: Nullable<string>;

  @AllowNull
  @Column(DataType.STRING)
  isbn: Nullable<string>;

  @AllowNull
  @Column(DataType.JSONB)
  settings: Nullable<Record<string, unknown>>;

  @AllowNull
  @Column(DataType.TEXT)
  notes: Nullable<string>;

  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @ForeignKey(() => Vendor)
  @Column(DataType.INTEGER)
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Nullable<Vendor>;

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
