// External
import { Subjects } from '@casl/prisma';

// Internal
import { createAbility } from '@/common/ability/ability.impl';
import type { Ability } from '@/common/ability/ability.types';
import type { User } from '@/prisma/prisma.service';

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// export type UserAbility = Ability<Subjects<{ User: User }>, Actions>;

// export const userAbilityFor = createAbility<User, UserAbility>({
//   MANAGER(user, builder) {
//     builder.can('manage', User);
//   },

//   HEAD(user, builder) {
//     builder.can('manage', User);
//   },

//   MEMBER(user, builder) {
//     builder.can('read', "User", {isActive: });
//     builder.can('update', 'User', { id: user.id });
//     builder.can('create', 'User');
//   },
// });
