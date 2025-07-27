// External dependencies
import { PrimaryKey, Property } from '@mikro-orm/postgresql';

// Internal dependencies

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  // @Property({ nullable: true })
  // createdById?: number;

  // @Property({ nullable: true })
  // updatedById?: number;

  // @Property({ onCreate: () => new Date() })
  // createdAt?: Date;

  // @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  // updatedAt?: Date;
}
