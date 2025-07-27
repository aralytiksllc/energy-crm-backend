// External dependencies
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';
import { AuthJwtPayload } from './auth-jwt.interfaces';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
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

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive.');
    }

    return user;
  }
}
