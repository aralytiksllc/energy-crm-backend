import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { Product } from '@/modules/products/models/product.model';

@Table({ tableName: 'vendors' })
export class Vendor extends Model {
  @Unique
  @Column(DataType.STRING)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  description: string;

  @AllowNull
  @Column(DataType.STRING)
  contactEmail: string;

  @AllowNull
  @Column(DataType.STRING)
  contactPhone: string;

  @AllowNull
  @Column(DataType.STRING)
  website: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @AllowNull
  @Column(DataType.JSON)
  settings?: Record<string, any>;

  @HasMany(() => Product)
  products: Product[];
}
