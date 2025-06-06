import { User } from '@/entities/user.entity';

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface TokenPayload {
  sub: number;
  email: string;
}
