// External
import { PureAbility } from '@casl/ability';
import { PrismaQuery } from '@casl/prisma';

// Internal

export type Ability<
  TSubjects extends string,
  TActions extends string,
> = PureAbility<[TActions, TSubjects], PrismaQuery>;
