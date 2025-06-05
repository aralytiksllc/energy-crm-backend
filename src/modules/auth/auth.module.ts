import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { SignInHandler } from './commands/sign-in.handler';
import { ForgotPasswordHandler } from './commands/forgot-password.handler';
import { ChangePasswordHandler } from './commands/change-password.handler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Command Handlers
    SignInHandler,
    ForgotPasswordHandler,
    ChangePasswordHandler,

    // Others
    AuthJwtStrategy,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
