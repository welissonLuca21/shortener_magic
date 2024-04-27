import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateShortenedUrlDto {
  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  userId?: string;
}