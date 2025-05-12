import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Auditable } from '@/common/auditable/auditable.entity';
import { Vendor } from '@/modules/vendors/entities/vendor.entity';
import { User } from '@/modules/users/entities/user.entity';
import { ProductUnit } from '../enums/product-unit.enum';
import { ProductPhoto } from './product-photo.entity';

@Entity('products')
export class Product extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ProductUnit })
  unit: ProductUnit;

  @Column({ type: 'varchar', unique: true })
  sku: string;

  @Column({ type: 'float', nullable: true })
  length?: number;

  @Column({ type: 'float', nullable: true })
  width?: number;

  @Column({ type: 'float', nullable: true })
  height?: number;

  @Column({ type: 'float', nullable: true })
  weight?: number;

  @Column({ type: 'varchar', nullable: true })
  upc?: string;

  @Column({ type: 'varchar', nullable: true })
  mpn?: string;

  @Column({ type: 'varchar', nullable: true })
  ean?: string;

  @Column({ type: 'varchar', nullable: true })
  isbn?: string;

  @Column({ type: 'simple-json', nullable: true })
  settings?: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => ProductPhoto, (photo) => photo.product, { cascade: true })
  photos: ProductPhoto[];

  @ManyToOne(() => Vendor, (vendor) => vendor.products, { nullable: false })
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;

  @Column({ type: 'uuid' })
  vendorId: string;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;
}
