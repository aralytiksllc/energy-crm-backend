import {
  Table,
  Column,
  DataType,
  Default,
  AllowNull,
  Unique,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ProductUnit } from '../enums/product-unit.enum';
import { BaseModel } from './base.model';
import { Vendor } from './vendor.model';
import { User } from './user.model';

@Table
export class Product extends BaseModel<Product> {
  @Unique
  @Column(DataType.STRING)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  description?: string;

  @Default(0)
  @Column(DataType.FLOAT)
  price: number;

  @Default(0)
  @Column(DataType.INTEGER)
  stock: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @AllowNull
  @Column(DataType.JSON)
  settings?: Record<string, any>;

  @Column(DataType.ENUM(...Object.values(ProductUnit)))
  unit: ProductUnit;

  @Unique
  @Column(DataType.STRING)
  sku: string;

  @AllowNull
  @Column(DataType.FLOAT)
  length?: number;

  @AllowNull
  @Column(DataType.FLOAT)
  width?: number;

  @AllowNull
  @Column(DataType.FLOAT)
  height?: number;

  @AllowNull
  @Column(DataType.FLOAT)
  weight?: number;

  @AllowNull
  @Column(DataType.STRING)
  upc?: string;

  @AllowNull
  @Column(DataType.STRING)
  mpn?: string;

  @AllowNull
  @Column(DataType.STRING)
  ean?: string;

  @AllowNull
  @Column(DataType.STRING)
  isbn?: string;

  @AllowNull
  @Column(DataType.TEXT)
  notes?: string;

  @ForeignKey(() => Vendor)
  @Column(DataType.INTEGER)
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
