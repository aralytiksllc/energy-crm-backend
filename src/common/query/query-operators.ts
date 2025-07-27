// External dependencies

// Internal dependencies
import { Operator } from './query.enums';

export class QueryOperators {
  static resolve<T, K extends keyof T>(operator: Operator, value: T[K]): any {
    switch (operator) {
      case Operator.EQ:
        return { $eq: value };

      case Operator.NE:
        return { $ne: value };

      case Operator.GT:
        return { $gt: value };

      case Operator.GTE:
        return { $gte: value };

      case Operator.LT:
        return { $lt: value };

      case Operator.LTE:
        return { $lte: value };

      case Operator.LIKE:
      case Operator.ILIKE:
        return { $like: `%${value}%` };

      case Operator.IN:
        return { $in: value as any[] };

      case Operator.RANGE: {
        if (typeof value === 'string' && value.includes(',')) {
          const [start, end] = value.split(',').map((v) => v.trim());
          return { $gte: start, $lte: end };
        }
        return { $eq: value };
      }

      default:
        return { $eq: value };
    }
  }
}
