// External
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEmail,
  IsObject,
} from 'class-validator';

// Internal

export class CreateMeteringPointDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  locationAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cityOrLocality?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tariffGroup?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  technicalContactName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  technicalContactTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  technicalContactPhone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  technicalContactEmail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  contractedCapacityValue?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contractedCapacityUnit?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  voltageLevel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  meterType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  connectionSpecs?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  agreedMaxDemandKw?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  utilityProvider?: string;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  gpsCoordinates?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  registeredAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  operationalStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  installationDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  contractEndDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  connectionType?: string;

  @ApiProperty()
  @IsNumber()
  branchId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  contactId?: number;
}
