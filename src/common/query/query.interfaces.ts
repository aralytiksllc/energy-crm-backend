// External dependencies

// Internal dependencies
export type QueryOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'in'
  | 'range';

export type QueryOrder = 'ASC' | 'DESC';

export interface QueryFilter<WhereInput> {
  field: keyof WhereInput;
  operator: QueryOperator;
  value: unknown;
}

export interface QuerySort<OrderByInput> {
  field: keyof OrderByInput;
  order: QueryOrder;
}

export interface QueryParams<WhereInput, OrderByInput> {
  filters?: QueryFilter<WhereInput>[];
  sorters?: QuerySort<OrderByInput>[];
  current?: number;
  pageSize?: number;
}

export interface QueryOptions<WhereInput, OrderByInput> {
  where: WhereInput;
  orderBy: OrderByInput[];
  skip: number;
  take: number;
}
