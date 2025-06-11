import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private userService: UsersService,
  ) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: {
    email: string;
  }): Promise<Pick<User, 'id' | 'email' | 'role'>> {
    const user = await this.userService.findByEmail(payload?.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
