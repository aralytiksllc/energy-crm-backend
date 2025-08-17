// External
import { IsInt, IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// Internal

export class CreateConsumptionDto {
  @IsOptional()
  @Type(() => Date)
  timestamp: string;

  @IsString()
  timeframe: string;

  @IsOptional()
  @IsNumber()
  electricityConsumptionKwh?: number;

  @IsInt()
  meteringPointId: number;

  @IsOptional()
  @IsInt()
  contractId?: number;
}
