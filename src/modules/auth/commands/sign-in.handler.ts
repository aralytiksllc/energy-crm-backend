import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hash } from '@/common/hash';
import { User } from '@/modules/users/entities/user.entity';
import { AuthResponse, TokenPayload } from '../auth.interfaces';
import { SignedInEvent } from '../events/signed-in.event';
import { SignInCommand } from './sign-in.command';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: SignInCommand): Promise<AuthResponse> {
    const { email, password } = command.dto;

    const user = await this.findActiveUserOrFail(email);

    const isPasswordValid = await Hash.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const tokenPayload: TokenPayload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    this.eventBus.publish(new SignedInEvent(user));

    return {
      accessToken,
      user,
    };
  }

  private async findActiveUserOrFail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
