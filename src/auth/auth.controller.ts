import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{
    access_token: string;
    user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  }> {
    return this.authService.login(loginDto);
  }
}
