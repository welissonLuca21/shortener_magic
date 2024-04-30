import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';
import { VerificationRepositoryContract } from '@shared/database/repositories/verification-repository.interface';

@Injectable()
export class ConfirmUserAccountService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
    @Inject('VerificationRepository')
    private readonly verificationRepository: VerificationRepositoryContract,
  ) {}

  async execute(token: string) {
    const verification =
      await this.verificationRepository.findVerificationByToken(token);

    if (!verification) {
      throw new NotFoundException({
        message: 'Verification token not found',
        resource: 'Confirm User Account',
        scope: 'User',
      });
    }

    console.log(verification);
    const user = await this.userRepository.findUserById(verification.userId);

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        resource: 'Confirm User Account',
        scope: 'User',
      });
    }

    await this.userRepository.confirmUserAccount(user.id);

    await this.verificationRepository.deleteVerification(verification.id);
  }
}
