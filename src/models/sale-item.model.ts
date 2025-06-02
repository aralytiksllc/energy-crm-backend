import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseModel } from '../common/cqrs/base.model';
import { User } from './user.model';
import { Sale } from './sale.model';
import { Product } from './product.model';

@Table
export class SaleItem extends BaseModel<SaleItem> {
  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @Column(DataType.DECIMAL(10, 2))
  discount: number;

  @Column(DataType.DECIMAL(10, 2))
  amount: number;

  @ForeignKey(() => Sale)
  @Column(DataType.INTEGER)
  saleId: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId: number;

  @BelongsTo(() => Sale)
  sale: Nullable<Sale>;

  @BelongsTo(() => Product)
  product: Nullable<Product>;

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
