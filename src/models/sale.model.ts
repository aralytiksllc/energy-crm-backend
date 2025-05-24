import {
  Table,
  Column,
  DataType,
  AllowNull,
  Unique,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Customer } from './customer.model';
import { SaleItem } from './sale-item.model';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table({ tableName: 'sales' })
export class Sale extends BaseModel<Sale> {
  @Unique
  @Column(DataType.INTEGER)
  saleNumber: number;

  @Column(DataType.DATEONLY)
  saleDate: Date;

  @AllowNull
  @Column(DataType.TEXT)
  notes?: string;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @HasMany(() => SaleItem)
  items?: SaleItem[];

  @BelongsTo(() => User, { foreignKey: 'createdById' })
  createdBy: User;

  @BelongsTo(() => User, { foreignKey: 'updatedById' })
  updatedBy: User;

  get formattedSaleNumber(): string {
    return `SALE-${this.saleNumber?.toString().padStart(5, '0')}`;
  }
}
