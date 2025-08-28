// External
import { IsOptional, IsString, IsNumber, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// Internal

export class CreateMeteringPointDto {
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @IsOptional()
  @IsString()
  locationAddress?: string;

  @IsOptional()
  @IsString()
  cityOrLocality?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  tariffGroup?: string;

  @IsOptional()
  @IsString()
  technicalContactName?: string;

  @IsOptional()
  @IsString()
  technicalContactTitle?: string;

  @IsOptional()
  @IsString()
  technicalContactPhone?: string;

  @IsOptional()
  @IsString()
  technicalContactEmail?: string;

  @IsOptional()
  @IsNumber()
  contractedCapacityValue?: number;

  @IsOptional()
  @IsString()
  contractedCapacityUnit?: string;

  @IsOptional()
  @IsString()
  voltageLevel?: string;

  @IsOptional()
  @IsString()
  meterType?: string;

  @IsOptional()
  @IsString()
  connectionSpecs?: string;

  @IsOptional()
  @IsNumber()
  agreedMaxDemandKw?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  meteringPointStatus?: string;

  @IsOptional()
  @IsString()
  utilityProvider?: string;

  @IsOptional()
  @IsString()
  gpsCoordinates?: string;

  @IsOptional()
  @IsString()
  registeredAddress?: string;

  @IsOptional()
  @IsString()
  operationalStatus?: string;

  @IsOptional()
  @Type(() => Date)
  installationDate?: Date;

  @IsOptional()
  @Type(() => Date)
  contractEndDate?: Date;

  @IsInt()
  branchId: number;
}
