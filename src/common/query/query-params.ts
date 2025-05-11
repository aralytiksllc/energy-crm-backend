import { IsOptional, IsObject, IsNumber, IsAlpha } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryFilter, QuerySort } from './query.interfaces';

export class QueryParams<T> {
  @IsOptional()
  @IsObject()
  filters?: QueryFilter<T>[];

  @IsOptional()
  @IsObject()
  sorters?: QuerySort<T>[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  current?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsAlpha()
  relations?: string[];
}
