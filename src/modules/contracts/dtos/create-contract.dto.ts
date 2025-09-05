// External
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal

export class CreateContractDto {
  @IsOptional()
  @IsDateString()
  effectiveDate?: string;

  @IsOptional()
  @IsDateString()
  supplyStartDate?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  initialTermYears?: number;

  @IsOptional()
  @IsDateString()
  maturityDate?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  renewalTermYears?: number;

  @IsOptional()
  @IsString()
  contractQuantity?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pricePerMwh?: number;

  @IsOptional()
  @IsBoolean()
  includesNetworkTariffs?: boolean;

  @IsOptional()
  @IsBoolean()
  includesVat?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  paymentTermsDays?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  securityDepositAmount?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  terminationNoticeDays?: number;

  @IsOptional()
  @IsString()
  earlyTerminationFee?: string;

  @IsOptional()
  @IsString()
  disputeResolutionMethod?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  forecastDeadlineDaysBeforeMonth?: number;

  @IsInt()
  @Type(() => Number)
  customerId!: number;
}
