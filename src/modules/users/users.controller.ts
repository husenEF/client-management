import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req): User {
    return req.user;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
