// External dependencies
import {
  Entity,
  Property,
  ManyToOne,
  BeforeCreate,
} from '@mikro-orm/postgresql';

// Internal dependencies
import { BaseEntity } from '@/common/cqrs/base.entity';
import { Token } from '@/common/token/token.impl';
import { DateTime } from '@/common/datetime/datetime.impl';
import { User } from './user.entity';

@Entity({ tableName: 'password_resets' })
export class PasswordReset extends BaseEntity {
  @Property()
  token?: string;

  @Property()
  expiresAt?: Date;

  @ManyToOne(() => User)
  user!: User;

  @BeforeCreate()
  setDefaultValues(): void {
    this.token ??= Token.generate();
    this.expiresAt ??= DateTime.expiresInHours(1);
  }
}
