// External dependencies
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { JwtService } from '@nestjs/jwt';

// Internal dependencies
import { Hash } from '@/common/hash/hash.impl';
import { User } from '@/modules/users/entities/user.entity';
import { LoggedInEvent } from '../events/logged-in.event';
import { AuthResponse, TokenPayload } from '../auth.interfaces';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    private readonly jwtService: JwtService,

    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: LoginCommand): Promise<AuthResponse> {
    const { email, password } = command.dto;

    const user = await this.userRepository.findOneOrFail({ email });

    await this.verifyPasswordOrThrow(password, user.password);

    const accessToken = await this.generateAccessToken(user);

    this.eventBus.publish(new LoggedInEvent(user));

    return { accessToken, user };
  }

  private async verifyPasswordOrThrow(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isValid = await Hash.compare(plainPassword, hashedPassword);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload: TokenPayload = { sub: user.id, email: user.email };

    return this.jwtService.signAsync(payload);
  }
}
