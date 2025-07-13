// External dependencies
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Internal dependencies
import { PrismaService } from '@/common/prisma/prisma.service';
import { EmailModule } from '@/common/email/email.module';
import { UserModule } from '@/modules/users/user.module';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { LoginHandler } from './commands/login.handler';
import { ForgotPasswordHandler } from './commands/forgot-password.handler';
import { UpdatePasswordHandler } from './commands/update-password.handler';
import { PasswordResetCreatedHandler } from './events/password-reset-created.handler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
    EmailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,

    // Command Handlers
    LoginHandler,
    ForgotPasswordHandler,
    UpdatePasswordHandler,

    // Event Handlers
    PasswordResetCreatedHandler,

    // Others
    AuthJwtStrategy,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
