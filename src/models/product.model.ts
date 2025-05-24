import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  Unique,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Vendor } from './vendor.model';
import { ProductUnit } from '@/enums/product-unit.enum';

@Table({ tableName: 'products' })
export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.TEXT)
  description: string;

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
  @Column(DataType.JSON)
  settings?: Record<string, any>;

  @AllowNull
  @Column(DataType.TEXT)
  notes?: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive?: boolean;

  @ForeignKey(() => Vendor)
  @Column(DataType.INTEGER)
  vendorId: number;

  @BelongsTo(() => Vendor)
  vendor: Vendor;
}
