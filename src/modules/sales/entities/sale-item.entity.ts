import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Auditable } from '@/common/auditable/auditable.entity';
import { Product } from '@/modules/products/entities/product.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Sale } from './sale.entity';

@Entity('sales_items')
export class SaleItem extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', default: 1 })
  quantity: number;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'float', default: 0 })
  discount: number;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @ManyToOne(() => Sale, (sale) => sale.items, { onDelete: 'CASCADE' })
  sale: Sale;

  @ManyToOne(() => Product, { nullable: false })
  product: Product;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;

  @BeforeInsert()
  @BeforeUpdate()
  calculateAmount() {
    const total = this.price * this.quantity;
    const discountAmount = total * (this.discount / 100);
    this.amount = total - discountAmount;
  }
}
