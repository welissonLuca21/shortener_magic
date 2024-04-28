import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { SigninService } from './services/signin.service';
import { ValidateUserService } from './services/validate-user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [SigninService, ValidateUserService, LocalStrategy, JwtStrategy],
  exports: [SigninService, ValidateUserService],
})
export class AuthModule {}
