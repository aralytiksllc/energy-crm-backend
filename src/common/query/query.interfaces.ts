import { QueryOperator } from './query.enums';

type StringKeyOf<T> = Extract<keyof T, string>;

export type QueryFilter<T, K extends StringKeyOf<T> = StringKeyOf<T>> = {
  field: K;
  operator: QueryOperator;
  value: T[K];
};

export type QuerySort<T, K extends StringKeyOf<T> = StringKeyOf<T>> = {
  field: K;
  order: 'ASC' | 'DESC';
};
