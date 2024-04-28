import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateShortnedUrlDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;
}
