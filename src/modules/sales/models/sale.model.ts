import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Customer } from '@/modules/customers/models/customer.model';
import { SaleItem } from './sale-item.model';

@Table({ tableName: 'sales' })
export class Sale extends Model {
  @Unique
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  saleNumber!: number;

  @Column(DataType.DATEONLY)
  saleDate: Date;

  @AllowNull
  @Column(DataType.TEXT)
  notes?: string;

  @BelongsTo(() => Customer)
  customer?: Customer;

  @HasMany(() => SaleItem)
  items?: SaleItem[];

  get formattedSaleNumber(): string {
    return `SALE-${this.saleNumber?.toString().padStart(5, '0')}`;
  }
}
