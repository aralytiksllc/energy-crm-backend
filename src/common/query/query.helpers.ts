// External dependencies

// Internal dependencies
import type { QueryOperator } from './query.interfaces';

export class QueryHelpers {
  static resolveOperator(operator: QueryOperator, value: unknown): unknown {
    switch (operator) {
      case 'eq':
        return { $eq: value };

      case 'ne':
        return { $ne: value };

      case 'gt':
        return { $gt: value };

      case 'gte':
        return { $gte: value };

      case 'lt':
        return { $lt: value };

      case 'lte':
        return { $lte: value };

      case 'like':
      case 'ilike':
        return { $like: `%${value}%` };

      case 'in':
        return { $in: Array.isArray(value) ? value : [value] };

      case 'range': {
        if (Array.isArray(value) && value.length === 2) {
          return { $gte: value[0], $lte: value[1] };
        }
        throw new Error(
          `Invalid range value: expected array with 2 elements, got ${JSON.stringify(value)}`,
        );
      }

      default:
        return { $eq: value };
    }
  }
}
