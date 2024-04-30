import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { FindUserByIdService } from './services/find-user-by-id.service';
import { ListAllUsersService } from './services/list-all-users.service';
import { RestoreUserService } from './services/restore-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UserController } from './controllers/user.controller';
import { ConfirmUserAccountService } from './services/confirm-user-account.service';
import { ResendConfirmationCodeService } from './services/resend-confirmation-code.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    DeleteUserService,
    FindUserByIdService,
    RestoreUserService,
    UpdateUserService,
    ListAllUsersService,
    ConfirmUserAccountService,
    ResendConfirmationCodeService
  ],
  exports: [
    CreateUserService,
    DeleteUserService,
    FindUserByIdService,
    RestoreUserService,
    UpdateUserService,
    ListAllUsersService,
  ],
})
export class UsersModule {}
