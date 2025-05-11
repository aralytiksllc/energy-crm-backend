import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Auditable } from '@/common/auditable/auditable.entity';
import { Sale } from '@/modules/sales/entities/sale.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity('customers')
export class Customer extends Auditable {
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

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @ManyToOne(() => User, { lazy: true, nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;
}
