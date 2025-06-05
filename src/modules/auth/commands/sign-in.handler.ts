import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Hash } from '@/common/hash';
import { User } from '@/models/user.model';
import { AuthResponse, TokenPayload } from '../auth.interfaces';
import { SignedInEvent } from '../events/signed-in.event';
import { SignInCommand } from './sign-in.command';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    private readonly jwtService: JwtService,

    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: SignInCommand): Promise<AuthResponse> {
    const { email, password } = command.dto;

    const user = await this.findActiveUserByEmail(email);

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

  private async findActiveUserByEmail(email: string): Promise<User> {
    const where = { email, isActive: true };

    const user = await this.userModel.findOne({ where });

    console.log(where, user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}
