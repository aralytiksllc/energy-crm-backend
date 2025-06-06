import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '@/common/cqrs/base.entity';
import { Hash } from '@/common/hash';
import { User } from './user.entity';

@Entity('vendors')
export class Vendor extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Nullable<Date>;

  @Column({ type: 'date', nullable: true })
  dateOfJoining: Nullable<Date>;

  @Column({ type: 'jsonb', nullable: true })
  settings: Nullable<Record<string, unknown>>;

  @Column({ type: 'text', nullable: true })
  notes: Nullable<string>;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: Nullable<User>;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: Nullable<User>;
}
