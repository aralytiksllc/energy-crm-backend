// External

import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal

export class CreateContractDto {
  @IsString()
  contractNumber: string;

  @IsOptional()
  @Type(() => Date)
  effectiveDate?: Date;

  @IsOptional()
  @Type(() => Date)
  supplyStartDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  initialTermYears?: number;

  @IsOptional()
  @Type(() => Date)
  maturityDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  renewalTermYears?: number;

  @IsOptional()
  @IsString()
  contractQuantity?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerMwh?: number;

  @IsOptional()
  @IsBoolean()
  includesNetworkTariffs?: boolean;

  @IsOptional()
  @IsBoolean()
  includesVat?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  paymentTermsDays?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  securityDepositAmount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  terminationNoticeDays?: number;

  @IsOptional()
  @IsString()
  earlyTerminationFee?: string;

  @IsOptional()
  @IsString()
  disputeResolutionMethod?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  forecastDeadlineDaysBeforeMonth?: number;

  @IsOptional()
  @IsInt()
  customerId?: number;
}
