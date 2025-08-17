// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
