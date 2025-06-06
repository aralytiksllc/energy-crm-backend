import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
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

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  createdById?: number;
}
