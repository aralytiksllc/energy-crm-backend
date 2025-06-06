import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { User } from '@/models/user.model';
import { PasswordReset } from '@/modules/auth/entities/password-reset.entity';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { SignInHandler } from './commands/sign-in.handler';
import { ForgotPasswordHandler } from './commands/forgot-password.handler';
import { ChangePasswordHandler } from './commands/change-password.handler';
import { SignedInEvent } from './events/signed-in.event';
import { PasswordChangedEvent } from './events/password-changed.event';
import { PasswordResetCreatedEvent } from './events/password-reset-created.event';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    PassportModule,
    SequelizeModule.forFeature([User, PasswordReset]),
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

    // Events
    SignedInEvent,
    PasswordChangedEvent,
    PasswordResetCreatedEvent,

    // Others
    AuthJwtStrategy,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
