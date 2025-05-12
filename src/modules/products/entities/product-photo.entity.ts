import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Auditable } from '@/common/auditable/auditable.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Product } from './product.entity';

@Entity('product_photos')
export class ProductPhoto extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => Product, (product) => product.photos, {
    orphanedRowAction: 'delete',
  })
  product: Product;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;
}
