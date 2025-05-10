import {
  Between,
  Equal,
  FindOperator,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { QueryOperator } from './query.enums';

export class QueryOperators {
  static resolve<T, K extends keyof T>(
    operator: QueryOperator,
    value: T[K],
  ): FindOperator<any> {
    switch (operator) {
      case QueryOperator.EQ: {
        return Equal(value);
      }

      case QueryOperator.NE: {
        return Not(value);
      }

      case QueryOperator.GT: {
        return MoreThan(value);
      }

      case QueryOperator.GTE: {
        return MoreThanOrEqual(value);
      }

      case QueryOperator.LT: {
        return LessThan(value);
      }

      case QueryOperator.LTE: {
        return LessThanOrEqual(value);
      }

      case QueryOperator.LIKE: {
        return Like(this.toString(value));
      }

      case QueryOperator.ILIKE: {
        return ILike(this.toString(value));
      }

      case QueryOperator.IN: {
        return In(this.toArray(value));
      }

      case QueryOperator.RANGE: {
        if (typeof value !== 'string') return Equal(value);
        const [start, end] = value.split(',').map((v) => v.trim());
        return Between(start, end);
      }

      default: {
        return Equal(value);
      }
    }
  }

  private static toString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : String(value);
  }

  private static toArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
  }
}
