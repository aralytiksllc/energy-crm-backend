import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { User } from '@/models/user.model';
import { AuthJwtPayload } from './auth-jwt.interfaces';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
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
    const user = await this.userModel.findOne({ where });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
