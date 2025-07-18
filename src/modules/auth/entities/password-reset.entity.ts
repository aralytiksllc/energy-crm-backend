// External dependencies
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

// Internal dependencies
import { BaseEntity } from '@/common/cqrs/base.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity('password_resets')
export class PasswordReset extends BaseEntity {
  @Column()
  email: string;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: Nullable<User>;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: Nullable<User>;
}
