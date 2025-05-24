import {
  Table,
  Column,
  DataType,
  Default,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { ProductUnit } from '@/enums/product-unit.enum';
import { BaseModel } from './base.model';

@Table({ tableName: 'products' })
export class Product extends BaseModel<Product> {
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

  @Column(DataType.INTEGER)
  vendorId: number;
}
