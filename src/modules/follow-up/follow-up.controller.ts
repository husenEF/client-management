import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../auth/type/auth.request';

@Controller('follow-ups')
@UseGuards(JwtAuthGuard)
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @Post()
  create(@Body() dto: CreateFollowUpDto, @Request() req: AuthRequest) {
    return this.followUpService.create(req.user.id, dto);
  }

  @Get()
  findMyFollowUps(@Request() req: AuthRequest) {
    return this.followUpService.findByUser(req.user.id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() dto: UpdateFollowUpDto,
  //   @Request() req: AuthRequest,
  // ) {
  //   return this.followUpService.update(id, req.user.id, dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string, @Request() req: AuthRequest) {
  //   return this.followUpService.remove(id, req.user.id);
  // }
}
