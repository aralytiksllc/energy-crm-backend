import { Column } from 'typeorm';

import { BaseEntity } from '@/common/cqrs/base.entity';

export abstract class Partner extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ nullable: true })
  businessName?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  addressLine1?: string;

  @Column({ nullable: true })
  addressLine2?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  zip?: string;

  @Column({ nullable: true })
  country?: string;
}
