import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/modules/users/users.module';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { PasswordReset } from '../../entities/password-reset.entity';
import { ChangePasswordHandler } from './commands/change-password.handler';
import { ForgotPasswordHandler } from './commands/forgot-password.handler';
import { SignInHandler } from './commands/sign-in.handler';
import { AuthController } from './auth.controller';
import { PasswordResetsRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([PasswordReset]),
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
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    // Command Handlers
    SignInHandler,
    ForgotPasswordHandler,
    ChangePasswordHandler,

    // Others
    AuthJwtStrategy,
    PasswordResetsRepository,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
