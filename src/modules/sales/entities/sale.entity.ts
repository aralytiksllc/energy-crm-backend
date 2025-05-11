import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Auditable } from '@/common/auditable/auditable.entity';
import { Customer } from '@/modules/customers/entities/customer.entity';
import { User } from '@/modules/users/entities/user.entity';
import { SaleItem } from './sale-item.entity';

@Entity('sales')
export class Sale extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', generated: 'increment', unique: true })
  saleNumber: number;

  @Column({ type: 'date' })
  saleDate: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Customer, (customer) => customer.sales, { nullable: false })
  customer: Customer;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale, { cascade: true })
  items: SaleItem[];

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;

  get formattedSaleNumber(): string {
    return `SALE-${this.saleNumber.toString().padStart(5, '0')}`;
  }
}
