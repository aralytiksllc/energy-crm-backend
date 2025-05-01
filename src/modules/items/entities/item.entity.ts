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
import { ItemType } from '../enums/item-type.enum';
import { ItemPhoto } from './item-photo.entity';

@Entity('items')
export class Item extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ItemType })
  type: ItemType;

  @Column({ type: 'varchar', unique: true })
  sku: string;

  @Column({ type: 'varchar', nullable: true })
  unit: string;

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

  @OneToMany(() => ItemPhoto, (photo) => photo.item, { cascade: true })
  photos: ItemPhoto[];

  @ManyToOne(() => Vendor, (vendor) => vendor.items, { nullable: false })
  vendor: Vendor;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;
}
