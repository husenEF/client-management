import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  //   @IsOptional()
  //   @IsEnum(['NEW', 'FOLLOW_UP', 'INACTIVE'])
  //   status?: 'NEW' | 'FOLLOW_UP' | 'INACTIVE';

  //   @IsOptional()
  //   @IsString()
  //   company?: string;
}
