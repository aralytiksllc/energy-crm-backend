// External dependencies
import { Entity, Property, PrimaryKey } from '@mikro-orm/postgresql';

// Internal dependencies

@Entity()
export class Contact {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ nullable: true })
  title?: string;

  @Property()
  email!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property()
  isPrimary!: boolean;

  @Property({ type: 'text', nullable: true })
  notes?: string;
}
