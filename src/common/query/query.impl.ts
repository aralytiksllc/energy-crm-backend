import { QueryHelpers } from './query.helpers';
import { QueryParamsDto } from './dtos/query-params.dto';
import type {
  QueryFilter,
  QuerySort,
  QueryOptions,
  QueryOperator,
  QueryOrder,
} from './query.interfaces';

export class Query<WhereInput, OrderByInput> {
  private readonly _filters: QueryFilter<WhereInput>[] = [];
  private readonly _sorters: QuerySort<OrderByInput>[] = [];
  private _current: number;
  private _pageSize: number;

  constructor(params: QueryParamsDto) {
    // @ts-ignore
    this._filters = (params.filters ?? []).map((filter) => ({
      field: filter.field as keyof WhereInput,
      operator: filter.operator,
      value: filter.value,
    }));

    // @ts-ignore
    this._sorters = (params.sorters ?? []).map((sorter) => ({
      field: sorter.field as keyof OrderByInput,
      order: sorter.order,
    }));

    this._current = params.current ?? 1;
    this._pageSize = params.pageSize ?? 20;
  }

  public get filters(): QueryFilter<WhereInput>[] {
    return this._filters;
  }

  public get sorters(): QuerySort<OrderByInput>[] {
    return this._sorters;
  }

  public get current(): number {
    return this._current;
  }

  public get pageSize(): number {
    return this._pageSize;
  }

  public addFilter(
    field: keyof WhereInput,
    operator: QueryOperator,
    value: unknown,
  ): this {
    // @ts-ignore
    this._filters.push({ field, operator, value });
    return this;
  }

  public addSorter(field: keyof OrderByInput, order: QueryOrder): this {
    // @ts-ignore
    this._sorters.push({ field, order });
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

  public toQueryOptions(): QueryOptions<WhereInput, OrderByInput> {
    return {
      where: this.getWhereOptions(),
      // @ts-ignore
      orderBy: this.getOrderOptions(),
      offset: this.getOffset(),
      limit: this.getLimit(),
    };
  }

  private getWhereOptions(): WhereInput {
    const where = {} as Record<keyof WhereInput, unknown>;

    for (const filter of this._filters) {
      where[filter.field] = QueryHelpers.resolveOperator(
        filter.operator,
        filter.value,
      );
    }

    return where as WhereInput;
  }

  private getOrderOptions(): OrderByInput {
    return this._sorters.reduce(
      (acc, sorter) => {
        acc[sorter.field as string] = sorter.order.toLowerCase();
        return acc;
      },
      {} as Record<string, any>,
    ) as OrderByInput;
  }

  private getLimit(): number {
    return this._pageSize;
  }

  private getOffset(): number {
    return (this._current - 1) * this._pageSize;
  }
}
