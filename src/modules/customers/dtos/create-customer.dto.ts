import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  registeredAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  legalNoticeEmail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  defaultOperationalEmail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  defaultEscalationEmail?: string;

  @ApiProperty()
  @IsString()
  registrationNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  businessType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  registrationDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  registeredCapital?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mainActivity?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  legalId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  legalStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cityRegion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  authorizedRepresentative?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sectorPrimary?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sectorSecondary?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  preferredCommunicationLanguage?: string;
}
