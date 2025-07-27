import { Operator, Sort } from './query.enums';

type StringKeyOf<T> = Extract<keyof T, string>;

export type QueryFilter<T, K extends StringKeyOf<T> = StringKeyOf<T>> = {
  field: K;
  operator: Operator;
  value: T[K];
};

export type QuerySort<T, K extends StringKeyOf<T> = StringKeyOf<T>> = {
  field: K;
  order: Sort;
};

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

export type QueryOrder = 'asc' | 'desc';

export type QueryOptions<WhereInput, OrderByInput> = {
  where?: WhereInput;
  orderBy?: OrderByInput[];
  take?: number;
  skip?: number;
};
