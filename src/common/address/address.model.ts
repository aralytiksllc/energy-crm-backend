// External dependencies
import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';

// Internal dependencies
import { AddressType } from './address-type.enum';

@Entity({ abstract: true })
export abstract class Address {
  @PrimaryKey()
  id!: number;

  @Property()
  street!: string;

  @Property({ nullable: true })
  streetTwo?: string;

  @Property()
  city!: string;

  @Property()
  state!: string;

  @Property()
  country!: string;

  @Property()
  postalCode!: string;

  @Property({ default: AddressType.BOTH })
  addressType: AddressType = AddressType.BOTH;

  @Property({ default: true })
  isPrimary: boolean = true;

  @Property()
  addressableType!: string;

  @Property()
  addressableId!: number;
}
