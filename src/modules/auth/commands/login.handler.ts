// External dependencies
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

// Internal dependencies
import { PrismaService } from '@/common/prisma/prisma.service';
import { Hash } from '@/common/hash/hash.impl';
import { AuthResponse, TokenPayload } from '../auth.interfaces';
import { LoggedInEvent } from '../events/logged-in.event';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: LoginCommand): Promise<AuthResponse> {
    const { email, password } = command.dto;

    const user = await this.findActiveUserOrFail(email);

    const isPasswordValid = await Hash.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const tokenPayload: TokenPayload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    this.eventBus.publish(new LoggedInEvent(user));

    return {
      accessToken,
      user,
    };
  }

  private async findActiveUserOrFail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
