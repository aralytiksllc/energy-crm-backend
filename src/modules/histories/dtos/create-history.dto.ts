// External dependencies
import { IsEnum, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

// Internal dependencies
import { HistoryAction } from '../enums/history-action.enum';

export class CreateHistoryDto {
  @IsEnum(HistoryAction)
  action: HistoryAction;

  @IsNumber()
  @Type(() => Number)
  entityId: number;

  @IsString()
  @IsNotEmpty()
  entityName: string;

  @IsNotEmpty()
  entityData: any;
}
