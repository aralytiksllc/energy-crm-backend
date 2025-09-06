// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Internal
import { Hash } from '@/common/hash/hash.impl';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { LoggedInEvent } from '../events/logged-in.event';
import { AuthResponse } from '../auth.interfaces';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler
  implements ICommandHandler<LoginCommand, AuthResponse>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: LoginCommand): Promise<AuthResponse> {
    const { email, password } = command.dto;

    const user = await this.prisma.client.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!(await Hash.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    });

    this.eventBus.publish(new LoggedInEvent(user));

    return { accessToken, user };
  }
}
