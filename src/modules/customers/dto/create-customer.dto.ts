import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEmail()
  @IsOptional()
  contactEmail: string;

  @IsString()
  @IsOptional()
  contactPhone: string;

  @IsUrl()
  @IsOptional()
  website: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  settings?: Record<string, any>;
}
