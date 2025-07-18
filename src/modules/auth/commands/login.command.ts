// External dependencies

// Internal dependencies
import { LoginDto } from '../dtos/login.dto';

export class LoginCommand {
  constructor(public readonly dto: LoginDto) {}
}
