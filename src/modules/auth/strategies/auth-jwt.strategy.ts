// External
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import type { User } from '@prisma/client';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { AuthJwtPayload } from './auth-jwt.interfaces';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const secretOrKey = configService.get<string>('JWT_SECRET');

    if (!secretOrKey) throw new Error('JWT secret key is not configured.');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: AuthJwtPayload): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) throw new UnauthorizedException('Unauthorized.');

    if (!user.isActive) throw new UnauthorizedException('Unauthorized.');

    const { password, ...safeUser } = user;

    return safeUser;
  }
}
