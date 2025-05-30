import { Op } from 'sequelize';
import { Operator } from './query.enums';

export class QueryOperators {
  static resolve<T, K extends keyof T>(
    operator: Operator,
    value: T[K],
  ): Record<string, any> {
    switch (operator) {
      case Operator.EQ:
        return { [Op.eq]: value };

      case Operator.NE:
        return { [Op.ne]: value };

      case Operator.GT:
        return { [Op.gt]: value };

      case Operator.GTE:
        return { [Op.gte]: value };

      case Operator.LT:
        return { [Op.lt]: value };

      case Operator.LTE:
        return { [Op.lte]: value };

      case Operator.LIKE:
        return { [Op.like]: value };

      case Operator.ILIKE:
        return { [Op.iLike]: value };

      case Operator.IN:
        return { [Op.in]: value };

      case Operator.RANGE: {
        if (typeof value === 'string' && value.includes(',')) {
          const [start, end] = value.split(',').map((v) => v.trim());
          return { [Op.between]: [start, end] };
        }

        return { [Op.eq]: value };
      }

      default:
        return { [Op.eq]: value };
    }
  }
}
