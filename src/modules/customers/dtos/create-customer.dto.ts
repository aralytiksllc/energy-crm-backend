// External
import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal

export class CreateCustomerDto {
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  registeredAddress?: string;

  @IsOptional()
  @IsEmail()
  legalNoticeEmail?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  defaultOperationalEmail?: string;

  @IsOptional()
  @IsEmail()
  defaultEscalationEmail?: string;

  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @IsOptional()
  @IsString()
  businessType?: string;

  @IsOptional()
  @Type(() => Date)
  registrationDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  registeredCapital?: number;

  @IsOptional()
  @IsString()
  companyStatus?: string;

  @IsOptional()
  @IsString()
  mainActivity?: string;

  @IsOptional()
  @IsString()
  legalId?: string;

  @IsOptional()
  @IsString()
  legalStatus?: string;

  @IsOptional()
  @IsString()
  companyCode?: string;

  @IsOptional()
  @IsString()
  companyType?: string;

  @IsOptional()
  @IsString()
  companyDescription?: string;

  @IsOptional()
  @IsString()
  cityRegion?: string;

  @IsOptional()
  @IsString()
  authorizedRepresentative?: string;

  @IsOptional()
  @IsString()
  companyRole?: string;

  @IsOptional()
  @IsString()
  sectorPrimary?: string;

  @IsOptional()
  @IsString()
  sectorSecondary?: string;

  @IsOptional()
  @IsString()
  clientStatus?: string;

  @IsOptional()
  @IsString()
  preferredCommunicationLanguage?: string;
}
