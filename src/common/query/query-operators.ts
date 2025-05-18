import { Op } from 'sequelize';
import { QueryOperator } from './query.enums';

export class QueryOperators {
  static resolve<T, K extends keyof T>(
    operator: QueryOperator,
    value: T[K],
  ): Record<string, any> {
    switch (operator) {
      case QueryOperator.EQ:
        return { [Op.eq]: value };

      case QueryOperator.NE:
        return { [Op.ne]: value };

      case QueryOperator.GT:
        return { [Op.gt]: value };

      case QueryOperator.GTE:
        return { [Op.gte]: value };

      case QueryOperator.LT:
        return { [Op.lt]: value };

      case QueryOperator.LTE:
        return { [Op.lte]: value };

      case QueryOperator.LIKE:
        return { [Op.like]: this.toString(value) };

      case QueryOperator.ILIKE:
        return { [Op.iLike]: this.toString(value) };

      case QueryOperator.IN:
        return { [Op.in]: this.toArray(value) };

      case QueryOperator.RANGE: {
        if (typeof value !== 'string') return { [Op.eq]: value };
        const [start, end] = value.split(',').map((v) => v.trim());
        return { [Op.between]: [start, end] };
      }

      default: {
        return { [Op.eq]: value };
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
