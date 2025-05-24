import {
  Table,
  Column,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Product } from './product.model';
import { Sale } from './sale.model';
import { User } from './user.model';

@Table
export class SaleItem extends BaseModel<SaleItem> {
  @Default(1)
  @Column(DataType.FLOAT)
  quantity: number;

  @Default(0)
  @Column(DataType.FLOAT)
  price: number;

  @Default(0)
  @Column(DataType.FLOAT)
  discount: number;

  @Default(0)
  @Column(DataType.FLOAT)
  amount: number;

  @ForeignKey(() => Sale)
  @Column(DataType.INTEGER)
  saleId: number;

  @BelongsTo(() => Sale, { onDelete: 'CASCADE' })
  sale: Sale;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;

  @BeforeCreate
  @BeforeUpdate
  static calculateAmount(instance: SaleItem) {
    instance.amount = (instance.price - instance.discount) * instance.quantity;
  }
}
