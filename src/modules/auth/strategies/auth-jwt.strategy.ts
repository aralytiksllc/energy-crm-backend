// External dependencies
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';

import { AuthJwtPayload } from './auth-jwt.interfaces';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userRepository: Repository<User>,
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

    const where = { email, isActive: true };

    const user = await this.userRepository.findOneBy(where);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
