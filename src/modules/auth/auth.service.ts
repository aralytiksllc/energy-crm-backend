import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  ApiResponse,
  AuthResponse,
  RequestContext,
  TokenPayload,
} from './interfaces';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmationCode } from './entities/confirmation-code.entity';
import { Repository, MoreThan } from 'typeorm';
import { PasswordReset } from './entities/password-reset.entity';
import { GetConfirmationCodeDto } from './dto/confirmation-code.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UtilsService } from './utils/utils.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Hash } from '@/common/hash/hash';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInCommand } from './commands/sign-in.command';
import { ForgotPasswordCommand } from './commands/forgot-password.command';
import { ResetPasswordCommand } from './commands/reset-password.command';
import { ValidateTokenQuery } from './queries/validate-token.query';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private utilsService: UtilsService,
    @InjectRepository(PasswordReset)
    private passwordResetsRepository: Repository<PasswordReset>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  private hashPassword(password: string): string {
    const salt = this.configService.get<string>('PASSWORD_SALT');

    if (!salt) {
      throw new Error('Error: Configuration error with AuthService.');
    }

    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
  }

  private verifyPassword(inputPassword: string, storedHash: string): boolean {
    const hash = this.hashPassword(inputPassword);
    return hash === storedHash;
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    return this.commandBus.execute(new SignInCommand(email, password));
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<ApiResponse> {
    return this.commandBus.execute(new ForgotPasswordCommand(dto));
  }

  async resetPassword(dto: ResetPasswordDto): Promise<ApiResponse> {
    return this.commandBus.execute(new ResetPasswordCommand(dto));
  }

  async validateToken(
    token: string,
  ): Promise<{ success: boolean; payload?: TokenPayload; error?: unknown }> {
    return this.queryBus.execute(new ValidateTokenQuery(token));
  }
}
