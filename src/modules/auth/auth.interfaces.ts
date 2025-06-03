import { User } from '@/models/user.model';

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface TokenPayload {
  sub: number;
  email: string;
}
