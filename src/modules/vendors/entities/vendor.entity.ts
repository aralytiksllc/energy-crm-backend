import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Auditable } from '@/common/auditable/auditable.entity';
import { Product } from '@/modules/products/entities/product.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity('vendors')
export class Vendor extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  contactEmail?: string;

  @Column({ type: 'varchar', nullable: true })
  contactPhone?: string;

  @Column({ type: 'varchar', nullable: true })
  website?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'simple-json', nullable: true })
  settings?: Record<string, any>;

  @OneToMany(() => Product, (item) => item.vendor)
  products: Product[];

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;
}
