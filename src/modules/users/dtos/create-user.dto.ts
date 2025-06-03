import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsObject,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsDateString()
  dateOfJoining?: Date;

  @IsOptional()
  @IsObject()
  settings?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsBoolean()
  isActive: boolean;

  @IsInt()
  createdById: number;

  @IsInt()
  updatedById: number;
}
