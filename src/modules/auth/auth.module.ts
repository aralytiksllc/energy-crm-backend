import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '@/modules/users/users.module';
import { SignInHandler } from './commands/sign-in.handler';
import { ForgotPasswordHandler } from './commands/forgot-password.handler';
import { ResetPasswordHandler } from './commands/reset-password.handler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    SequelizeModule.forFeature([]),
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
  providers: [
    AuthService,
    SignInHandler,
    ForgotPasswordHandler,
    ResetPasswordHandler,
  ],
  exports: [AuthService],
})
export class AuthModule {}
