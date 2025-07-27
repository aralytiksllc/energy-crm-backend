// External dependencies

// Internal dependencies
import { ChangePasswordDto } from '../dtos/change-password.dto';

export class ChangePasswordCommand {
  constructor(public readonly dto: ChangePasswordDto) {}
}
