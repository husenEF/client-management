import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateFollowUpDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsDateString()
  followUpDate: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  clientId: string;
}
