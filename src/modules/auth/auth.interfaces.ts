// External
import { type User } from '@/common/prisma/prisma.client';

// Internal

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface TokenPayload {
  sub: number;
  email: string;
}
