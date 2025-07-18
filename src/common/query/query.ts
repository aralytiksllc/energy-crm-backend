import { FindManyOptions, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import { QueryOperators } from './query-operators';
import { QueryParams } from './query-params';
import { Operator, Sort } from './query.enums';
import { QueryFilter, QuerySort } from './query.interfaces';

export class Query<T extends object> {
  private readonly _filters: QueryFilter<T>[];
  private readonly _sorters: QuerySort<T>[];
  private _current: number;
  private _pageSize: number;

  constructor(params: QueryParams<T>) {
    this._filters = params.filters ?? [];
    this._sorters = params.sorters ?? [];
    this._current = params.current ?? 1;
    this._pageSize = params.pageSize ?? 20;
  }

  get filters(): QueryFilter<T>[] {
    return this._filters;
  }

  get sorters(): QuerySort<T>[] {
    return this._sorters;
  }

  get current(): number {
    return this._current;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  public addFilter(field: keyof T, operator: Operator, value: any): this {
    this._filters.push({ field, operator, value } as QueryFilter<T>);
    return this;
  }

  public addSorter(field: keyof T, order: Sort): this {
    this._sorters.push({ field, order } as QuerySort<T>);
    return this;
  }

  public setCurrent(current: number): this {
    this._current = current;
    return this;
  }

  public setPageSize(pageSize: number): this {
    this._pageSize = pageSize;
    return this;
  }

  public toFindManyOptions(
    params: FindManyOptions<T> = {},
  ): FindManyOptions<T> {
    const options: FindManyOptions<T> = Object.assign({}, params);
    options.where = this.getWhereOptions();
    options.order = this.getOrderOptions();
    options.skip = this.getOffset();
    options.take = this.getLimit();
    return options;
  }

  private getWhereOptions(): FindOptionsWhere<T> {
    const where: Record<string, any> = {};

    for (const filter of this._filters) {
      where[filter.field as string] = QueryOperators.resolve(
        filter.operator,
        filter.value,
      );
    }

    return where as FindOptionsWhere<T>;
  }

  private getOrderOptions(): FindOptionsOrder<T> {
    const order: Record<string, any> = {};

    for (const sorter of this._sorters) {
      order[sorter.field as string] = sorter.order.toLowerCase();
    }

    return order as FindOptionsOrder<T>;
  }

  private getLimit(): number {
    return this._pageSize;
  }

  private getOffset(): number {
    return (this._current - 1) * this._pageSize;
  }
}
