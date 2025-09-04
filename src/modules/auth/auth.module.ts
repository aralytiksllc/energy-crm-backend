// External
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Internal
import { EmailModule } from '@/common/email/email.module';
import { UserModule } from '@/modules/users/user.module';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { LoginHandler } from './commands/login.handler';
import { ForgotPasswordHandler } from './commands/forgot-password.handler';
import { ChangePasswordHandler } from './commands/change-password.handler';
import { PasswordResetCreatedHandler } from './events/password-reset-created.handler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    EmailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginHandler,
    ForgotPasswordHandler,
    ChangePasswordHandler,
    PasswordResetCreatedHandler,
    AuthJwtStrategy,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
