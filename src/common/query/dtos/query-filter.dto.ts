// External dependencies
import { IsString, IsOptional } from 'class-validator';

// Internal dependencies
import type { QueryOperator } from '../query.interfaces';

export class QueryFilterDto {
  @IsString()
  field: string;

  @IsString()
  operator: QueryOperator;

  @IsOptional()
  value: unknown;
}
