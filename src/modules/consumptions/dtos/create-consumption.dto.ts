import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateConsumptionDto {
  @IsNotEmpty()
  @IsDate()
  timestamp!: Date;

  @IsOptional()
  @IsString()
  timeframe: string = '15m';

  @IsOptional()
  @IsNumber()
  electricityConsumptionKwh?: number;
}
