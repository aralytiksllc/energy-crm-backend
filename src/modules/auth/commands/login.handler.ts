// External dependencies

// Internal dependencies
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '@/common/hash';
import { User } from '@/modules/users/entities/user.entity';
import { AuthResponse, TokenPayload } from '../auth.interfaces';
import { LoggedInEvent } from '../events/logged-in.event';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userRepository: Repository<User>,
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

  private async findActiveUserOrFail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ email });

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
