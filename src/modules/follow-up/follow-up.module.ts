import { Module } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { FollowUpController } from './follow-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowUp } from './entities/follow-up.entity';
import { Client } from 'src/modules/client/entities/client.entity';

@Module({
  controllers: [FollowUpController],
  providers: [FollowUpService],
  imports: [TypeOrmModule.forFeature([FollowUp, Client])],
})
export class FollowUpModule {}
