// External dependencies
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsObject,
  IsInt,
} from 'class-validator';

// Internal dependencies

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsObject()
  settings?: Record<string, unknown>;

  @IsInt()
  createdById: number;

  @IsInt()
  updatedById: number;
}
