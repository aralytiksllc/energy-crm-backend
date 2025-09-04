// External
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

// Internal

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
