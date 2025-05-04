import { IsOptional, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryFilter, QueryOrder } from './query.interfaces';

export class QueryParams<T extends object> {
  @IsOptional()
  @IsObject()
  filter?: QueryFilter<T>;

  @IsOptional()
  @IsObject()
  orderBy?: QueryOrder<T>;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
