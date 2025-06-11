import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { User } from 'src/modules/users/entity/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createClientDto: CreateClientDto, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const client = this.clientRepository.create({
      ...createClientDto,
      owner: { id: user?.id }, // Assign just the ID instead of the whole user object
    });
    return this.clientRepository.save(client);
  }

  async findAll(userId: string) {
    return this.clientRepository.find({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });
  }

  findOne(id: string) {
    return this.clientRepository.findOne({ where: { id } });
  }

  private async getClientOrThrow(id: string, userId: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!client || client.owner.id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return client;
  }
  async update(id: string, userId: string, dto: UpdateClientDto) {
    const client = await this.getClientOrThrow(id, userId);

    Object.assign(client, dto);
    return this.clientRepository.save(client);
  }

  async remove(id: string, userId: string) {
    const client = await this.getClientOrThrow(id, userId);
    return this.clientRepository.remove(client);
  }
}
