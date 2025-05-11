import { FindOptionsWhere, FindOptionsOrder, FindManyOptions } from 'typeorm';
import { QueryParams } from './query-params';
import { QueryOperators } from './query-operators';
import { QueryFilter, QuerySort } from './query.interfaces';

export class Query<T extends object> {
  public readonly filters: QueryFilter<T>[];
  public readonly sorters: QuerySort<T>[];
  public readonly current: number;
  public readonly pageSize: number;
  public readonly relations: string[];

  constructor(params: QueryParams<T>) {
    this.filters = params.filters ?? [];
    this.sorters = params.sorters ?? [];
    this.current = params.current ?? 1;
    this.pageSize = params.pageSize ?? 20;
    this.relations = params.relations ?? [];
  }

  public toFindOptions(): FindManyOptions<T> {
    return {
      where: this.getWhereOptions(),
      order: this.getOrderOptions(),
      take: this.getTake(),
      skip: this.getSkip(),
      relations: this.getRelations(),
    };
  }

  private getSkip(): number {
    return (this.current - 1) * this.pageSize;
  }

  private getTake(): number {
    return this.pageSize;
  }

  private getRelations(): string[] {
    return this.relations;
  }

  private getWhereOptions(): FindOptionsWhere<T> {
    const where: Partial<Record<keyof T, unknown>> = {};

    for (const filter of this.filters) {
      const field = filter.field as keyof T;
      where[field] = QueryOperators.resolve<T, typeof field>(
        filter.operator,
        filter.value as T[typeof field],
      );
    }

    return where as FindOptionsWhere<T>;
  }

  private getOrderOptions(): FindOptionsOrder<T> {
    const order: Partial<Record<keyof T, 'ASC' | 'DESC'>> = {};

    for (const sorter of this.sorters) {
      const field = sorter.field as keyof T;
      order[field] = sorter.order;
    }

    return order as FindOptionsOrder<T>;
  }
}
