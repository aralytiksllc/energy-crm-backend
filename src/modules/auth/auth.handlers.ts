import { SignInHandler } from './commands/sign-in.handler';
import { ForgotPasswordHandler } from './commands/forgot-password.handler';
import { ResetPasswordHandler } from './commands/reset-password.handler';

export const AuthHandlers = [
  SignInHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
];
