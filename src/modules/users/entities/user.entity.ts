// External dependencies
import {
  Entity,
  Property,
  Unique,
  OneToMany,
  Collection,
  PrimaryKey,
} from '@mikro-orm/postgresql';
import { Exclude } from 'class-transformer';

// Internal dependencies
import { BaseEntity } from '@/common/cqrs/base.entity';
import { PasswordReset } from './password-reset.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  email: string;

  @Exclude()
  @Property()
  password: string;

  @Property({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Property({ type: 'date', nullable: true })
  dateOfJoining?: Date;

  @Property({ type: 'json', nullable: true })
  settings?: Record<string, unknown>;

  @Property({ type: 'text', nullable: true })
  notes?: string;

  @Property({ default: true })
  isActive?: boolean;

  @Exclude()
  @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
  passwordResets = new Collection<PasswordReset>(this);
}
