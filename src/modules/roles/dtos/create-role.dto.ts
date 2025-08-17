// External
import { IsString, IsNotEmpty } from 'class-validator';

// Internal

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
