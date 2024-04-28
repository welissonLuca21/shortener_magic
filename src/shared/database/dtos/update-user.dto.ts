import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()

  @IsString()
  name?: string;

  @ApiProperty()

  @IsString()
  surname?: string;

  @ApiProperty()

  @Transform(({ value }) => value.toLowerCase())
  username?: string;


  @ApiProperty()

  @IsString()
  password?: string;


  @ApiProperty()

  @IsString()
  oldPassword?: string;
}
