// External dependencies
import { IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

// Internal dependencies
import { QueryFilterDto } from './query-filter.dto';
import { QuerySortDto } from './query-sort.dto';

export class QueryParamsDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QueryFilterDto)
  filters: QueryFilterDto[] = [];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuerySortDto)
  sorters: QuerySortDto[] = [];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  current: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 20;
}
