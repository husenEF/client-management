import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { FollowUp } from './entities/follow-up.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { User } from 'src/modules/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

@Injectable()
export class FollowUpService {
  constructor(
    @InjectRepository(FollowUp)
    private readonly followUpRepo: Repository<FollowUp>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(userId: string, dto: CreateFollowUpDto) {
    const client = await this.clientRepo.findOneBy({
      id: dto.clientId,
    });
    if (!client) throw new NotFoundException('Client not found');

    const followUp = this.followUpRepo.create({
      title: dto.title,
      note: dto.note,
      followUpDate: new Date(dto.followUpDate),
      client,
      user: { id: userId } as User,
    });

    return this.followUpRepo.save(followUp);
  }

  async findByUser(userId: string) {
    return this.followUpRepo.find({
      where: { user: { id: userId } },
      relations: ['client'],
      order: { followUpDate: 'ASC' },
    });
  }

  findAll(userId: string) {
    return this.followUpRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'client'],
    });
  }

  findOne(id: string) {
    return this.followUpRepo.findOne({
      where: { id },
      relations: ['user', 'client'],
    });
  }

  async update(id: string, dto: UpdateFollowUpDto, userId: string) {
    const followUpData = await this.getFollowUpOrThrow(id, userId);
    Object.assign(followUpData, dto);
    return this.followUpRepo.save(followUpData);
  }

  async remove(id: string, userId: string) {
    const followUpData = await this.getFollowUpOrThrow(id, userId);
    return this.followUpRepo.remove(followUpData);
  }

  private async getFollowUpOrThrow(id: string, userId: string) {
    const followUpData = await this.followUpRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!followUpData || followUpData.user.id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return followUpData;
  }
}
