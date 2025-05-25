import { User } from '@/models/user.model';

export interface TokenPayload {
  sub: number;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
