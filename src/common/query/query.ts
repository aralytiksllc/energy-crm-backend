import { FindOptionsOrder, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { QueryParams } from './query-params';
import { QueryOperators } from './query-operators';
import { QueryFilter, QueryOrder } from './query.interfaces';
import { QueryOperator } from './query.enums';

export class Query<T extends object> {
  public readonly filter: QueryFilter<T>;
  public readonly orderBy: QueryOrder<T>;
  public readonly page: number;
  public readonly limit: number;

  constructor(params: QueryParams<T>) {
    this.filter = params.filter ?? {};
    this.orderBy = params.orderBy ?? {};
    this.page = params.page ?? 1;
    this.limit = params.limit ?? 20;
  }

  public toFindOptions(): FindManyOptions<T> {
    return {
      where: this.toWhere(),
      order: this.toOrder(),
      take: this.limit,
      skip: (this.page - 1) * this.limit,
    };
  }

  public toWhere(): FindOptionsWhere<T> {
    const where: Partial<Record<keyof T, unknown>> = {};

    console.log('this.filter', this.filter);

    for (const [key, value] of Object.entries(this.filter)) {
      if (value === undefined) continue;

      const [rawField, rawOperator] = key.split(':');
      const field = rawField as keyof T;
      const operator = (rawOperator || QueryOperator.EQ) as QueryOperator;

      where[field] = QueryOperators.resolve<T, typeof field>(
        operator,
        value as T[typeof field],
      );
    }

    return where as FindOptionsWhere<T>;
  }

  public toOrder(): FindOptionsOrder<T> {
    return this.orderBy as FindOptionsOrder<T>;
  }
}
