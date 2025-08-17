// External
import { AbilityBuilder, AnyAbility } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';

// Internal
import type { Ability } from './ability.types';

export function createAbility<
  TUser extends { role: string },
  TAbility extends AnyAbility,
>(
  rules: Record<
    string,
    (user: TUser, builder: AbilityBuilder<TAbility>) => void
  >,
) {
  return (user: TUser): TAbility => {
    const builder = new AbilityBuilder<TAbility>(createPrismaAbility);

    const grant = rules[user.role];

    if (grant) grant(user, builder);

    return builder.build();
  };
}
