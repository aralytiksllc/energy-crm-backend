// External dependencies
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

// Internal dependencies
import { Partner } from '@/common/partner/partner.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity('customers')
export class Customer extends Partner {
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: Nullable<User>;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: Nullable<User>;
}
