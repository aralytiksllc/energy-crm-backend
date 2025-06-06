import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { AuthJwtPayload } from './auth-jwt.interfaces';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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

    const user = await this.usersRepository.findOneBy({
      email,
      isActive: true,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
