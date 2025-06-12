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
  HttpCode,
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
    return this.clientService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Request() req: AuthRequest,
  ): Promise<Client> {
    return this.clientService.update(id, req.user.id, updateClientDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async remove(
    @Param('id') id: string,
    @Request() req: AuthRequest,
  ): Promise<void> {
    await this.clientService.remove(id, req.user.id);
    return;
  }
}
