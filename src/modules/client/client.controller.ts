import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { Client } from './entities/client.entity';
import { AuthRequest } from '../auth/type/auth.request';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createClientDto: CreateClientDto,
    @Request() req: AuthRequest,
  ): Promise<Client> {
    return await this.clientService.create(createClientDto, req.user.sub);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: AuthRequest) {
    console.log({ user: req.user.sub });
    return this.clientService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
