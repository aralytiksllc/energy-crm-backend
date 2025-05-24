import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { Product } from '@/modules/products/models/product.model';
import { Sale } from './sale.model';

@Table({ tableName: 'sales_items' })
export class SaleItem extends Model {
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
  @Column({ type: DataType.INTEGER })
  saleId: number;

  @BelongsTo(() => Sale, { onDelete: 'CASCADE' })
  sale: Sale;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BeforeCreate
  @BeforeUpdate
  static calculateAmount(instance: SaleItem) {
    const total = instance.price * instance.quantity;
    const discountAmount = total * (instance.discount / 100);
    instance.amount = total - discountAmount;
  }
}
