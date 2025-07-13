// External dependencies
import { IsString } from 'class-validator';

// Internal dependencies
import { QueryOrder } from '../query.interfaces';

export class QuerySortDto {
  @IsString()
  field: string;

  @IsString()
  order: QueryOrder;
}
