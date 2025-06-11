import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Body } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginResponse } from '../users/interface/login.response';
import { Role } from '../users/entity/user.role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return new LoginResponse({ access_token: token });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user; // dari JwtStrategy.validate()UsersService,
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register({ ...registerDto, role: Role.SALES });
  }
}
