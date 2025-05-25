import { SignInDto } from '../dtos/sign-in.dto';

export class SignInCommand {
  constructor(public readonly dto: SignInDto) {}
}
