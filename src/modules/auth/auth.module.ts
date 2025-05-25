import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PasswordReset } from './entities/password-reset.entity';
import { UtilsService } from './utils/utils.service';

// Command Handlers
import { SignInHandler } from './commands/handlers/sign-in.handler';
import { ForgotPasswordHandler } from './commands/handlers/forgot-password.handler';
import { ResetPasswordHandler } from './commands/handlers/reset-password.handler';

const CommandHandlers = [
  SignInHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
];

const QueryHandlers = [ValidateTokenHandler];

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    TypeOrmModule.forFeature([PasswordReset]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UtilsService, ...CommandHandlers, ...QueryHandlers],
  exports: [AuthService],
})
export class AuthModule {}
