import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { BaseModel } from '../common/cqrs/base.model';
import { User } from './user.model';
import { Customer } from './customer.model';
import { SaleItem } from './sale-item.model';

@Table
export class Sale extends BaseModel<Sale> {
  @Column(DataType.INTEGER)
  saleNumber: number;

  @Column(DataType.DATE)
  saleDate: Date;

  @AllowNull
  @Column(DataType.TEXT)
  notes: Nullable<string>;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @HasMany(() => SaleItem)
  items: SaleItem[];

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

  get formattedSaleNumber(): string {
    return `SALE-${this.saleNumber.toString().padStart(5, '0')}`;
  }
}
