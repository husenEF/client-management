import { Injectable } from '@nestjs/common';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { FollowUp } from './entities/follow-up.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { User } from 'src/modules/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FollowUpService {
  constructor(
    @InjectRepository(FollowUp)
    private readonly followUpRepo: Repository<FollowUp>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}
  async create(userId: string, dto: CreateFollowUpDto) {
    const client = await this.clientRepo.findOneBy({ id: dto.clientId });
    if (!client) throw new NotFoundException('Client not found');

    const followUp = this.followUpRepo.create({
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
}
