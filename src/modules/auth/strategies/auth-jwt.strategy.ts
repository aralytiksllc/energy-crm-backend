// External
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type User } from '@/common/prisma/prisma.client';
import { AuthJwtPayload } from './auth-jwt.interfaces';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
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
    const user = await this.prisma.client.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) throw new UnauthorizedException('Unauthorized.');

    if (!user.isActive) throw new UnauthorizedException('Unauthorized.');

    const { password, ...safeUser } = user;

    return safeUser;
  }
}
