// contact.dto.ts
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContactStatus } from '../enums/contact-status.enum';

export class CreateContactDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  type?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  role?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string | null;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;

  @Type(() => Number)
  @IsInt()
  customerId!: number;
}
