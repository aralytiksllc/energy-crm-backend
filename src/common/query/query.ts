import { FindOptions, WhereOptions, Order } from 'sequelize';
import { QueryParams } from './query-params';
import { QueryOperators } from './query-operators';
import { QueryFilter, QuerySort } from './query.interfaces';
import { Operator, Sort } from './query.enums';

export class Query<T extends object> {
  private filters: QueryFilter<T>[];
  private sorters: QuerySort<T>[];
  private current: number;
  private pageSize: number;

  constructor(params: QueryParams<T>) {
    this.filters = params.filters ?? [];
    this.sorters = params.sorters ?? [];
    this.current = params.current ?? 1;
    this.pageSize = params.pageSize ?? 20;
  }

  public addFilter(field: keyof T, operator: Operator, value: any): this {
    this.filters.push({ field, operator, value } as QueryFilter<T>);
    return this;
  }

  public addSorter(field: keyof T, order: Sort): this {
    this.sorters.push({ field, order } as QuerySort<T>);
    return this;
  }

  public setCurrent(current: number): this {
    this.current = current;
    return this;
  }

  public setPageSize(pageSize: number): this {
    this.pageSize = pageSize;
    return this;
  }

  public getWhereOptions(): WhereOptions<T> {
    const where: Record<string, any> = {};

    for (const filter of this.filters) {
      where[filter.field] = QueryOperators.resolve(
        filter.operator,
        filter.value,
      );
    }

    return where;
  }

  public getOrderOptions(): Order {
    return this.sorters.map((sorter) => [sorter.field, sorter.order]);
  }

  public getTake(): number {
    return this.pageSize;
  }

  public getSkip(): number {
    return (this.current - 1) * this.pageSize;
  }

  public toFindOptions(params: FindOptions<T> = {}): FindOptions<T> {
    return Object.assign({}, params, {
      where: this.getWhereOptions(),
      order: this.getOrderOptions(),
      limit: this.getTake(),
      offset: this.getSkip(),
    });
  }
}
