import { FindOptionsOrderValue } from 'typeorm';
import { QueryOperator } from './query.enums';

type QueryField<T> = Extract<keyof T, string>;
type FilterKey<T> = QueryField<T> | `${QueryField<T>}:${QueryOperator}`;

export type QueryFilter<T> = Partial<Record<FilterKey<T>, T[keyof T]>>;
export type QueryOrder<T> = Partial<Record<QueryField<T>, FindOptionsOrderValue>>;
