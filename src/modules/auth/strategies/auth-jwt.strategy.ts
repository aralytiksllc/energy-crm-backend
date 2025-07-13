// External dependencies
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '@prisma/client';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { AuthJwtPayload } from './auth-jwt.interfaces';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    const secretOrKey = configService.get<string>('JWT_SECRET');

    if (!secretOrKey) {
      throw new Error('JWT secret key is not configured.');
    }

    super({
      ignoreExpiration: false,
      jwtFromRequest,
      secretOrKey,
    });
  }

  async validate(authJwtPayload: AuthJwtPayload): Promise<User> {
    const { email } = authJwtPayload;

    const user = await this.prismaService.user.findFirst({
      where: { email, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
