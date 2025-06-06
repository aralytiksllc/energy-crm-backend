import {
  Equal,
  Not,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  Like,
  ILike,
  In,
  Between,
} from 'typeorm';
import { Operator } from './query.enums';

export class QueryOperators {
  static resolve<T, K extends keyof T>(
    operator: Operator,
    value: T[K],
  ): any {
    switch (operator) {
      case Operator.EQ:
        return Equal(value);

      case Operator.NE:
        return Not(Equal(value));

      case Operator.GT:
        return MoreThan(value);

      case Operator.GTE:
        return MoreThanOrEqual(value);

      case Operator.LT:
        return LessThan(value);

      case Operator.LTE:
        return LessThanOrEqual(value);

      case Operator.LIKE:
        return Like(value as string);

      case Operator.ILIKE:
        return ILike(value as string);

      case Operator.IN:
        return In(value as any[]);

      case Operator.RANGE: {
        if (typeof value === 'string' && value.includes(',')) {
          const [start, end] = value.split(',').map((v) => v.trim());
          return Between(start, end);
        }

        return Equal(value);
      }

      default:
        return Equal(value);
    }
  }
}
