import { FindOptions, Order, WhereOptions } from 'sequelize';
import { QueryParams } from './query-params';
import { QueryOperators } from './query-operators';
import { QueryFilter, QuerySort } from './query.interfaces';

export class Query<T extends object> {
  public readonly filters: QueryFilter<T>[] = [];
  public readonly sorters: QuerySort<T>[] = [];
  public readonly current: number;
  public readonly pageSize: number;

  constructor(params: QueryParams<T>) {
    this.filters = params.filters ?? [];
    this.sorters = params.sorters ?? [];
    this.current = params.current ?? 1;
    this.pageSize = params.pageSize ?? 20;
  }

  public toSequelizeOptions(): FindOptions<T> {
    return {
      where: this.getWhereOptions(),
      order: this.getOrderOptions(),
      limit: this.getTake(),
      offset: this.getSkip(),
    };
  }

  private getSkip(): number {
    return (this.current - 1) * this.pageSize;
  }

  private getTake(): number {
    return this.pageSize;
  }

  private getWhereOptions(): WhereOptions<T> {
    const where: Record<string, any> = {};

    for (const filter of this.filters) {
      where[filter.field] = QueryOperators.resolve(
        filter.operator,
        filter.value,
      );
    }

    return where;
  }

  private getOrderOptions(): Order {
    return this.sorters.map((sort) => [sort.field, sort.order]);
  }
}
