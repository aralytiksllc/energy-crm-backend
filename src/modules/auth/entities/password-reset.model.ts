import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/cqrs/base.entity';

@Entity('password_resets')
export class PasswordReset extends BaseEntity {
  @Column()
  email: string;

  @Column('int')
  code: number;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
