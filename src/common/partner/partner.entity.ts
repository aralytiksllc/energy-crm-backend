import { Entity, Property } from '@mikro-orm/postgresql';
import { BaseEntity } from '@/common/cqrs/base.entity';

@Entity({ abstract: true })
export abstract class Partner extends BaseEntity {
  @Property({ length: 255 })
  name!: string;

  @Property({ nullable: true })
  businessName?: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ nullable: true })
  addressLine1?: string;

  @Property({ nullable: true })
  addressLine2?: string;

  @Property({ nullable: true })
  city?: string;

  @Property({ nullable: true })
  state?: string;

  @Property({ nullable: true })
  zip?: string;

  @Property({ nullable: true })
  country?: string;
}
