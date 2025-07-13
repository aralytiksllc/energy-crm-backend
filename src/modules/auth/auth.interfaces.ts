// External dependencies
import { User } from '@prisma/client';

// Internal dependencies

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface TokenPayload {
  sub: number;
  email: string;
}
