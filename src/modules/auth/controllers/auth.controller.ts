import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginDTO } from '@modules/auth/dtos/login.dto';
import { Public } from '@shared/decorators/is-public-endpoint.decorator';
import { SigninService } from '../services/signin.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private signinService: SigninService) {}

  @Public()
  @ApiBody({ type: LoginDTO })
  @Post(`/login`)
  async login(@Body() data: LoginDTO) {
    return this.signinService.execute(data);
  }
}
