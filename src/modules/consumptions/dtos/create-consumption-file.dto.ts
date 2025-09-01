import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateConsumptionFileDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  meteringPointId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  contractId: number;
}
