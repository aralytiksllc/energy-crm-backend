import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/cqrs/base.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity()
export class Vendor extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: Nullable<string>;

  @Column({ type: 'varchar', nullable: true })
  email: Nullable<string>;

  @Column({ type: 'varchar', nullable: true })
  phone: Nullable<string>;

  @Column({ type: 'varchar', nullable: true })
  website: Nullable<string>;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  settings: Nullable<Record<string, unknown>>;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Nullable<User>;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Nullable<User>;
}
