import { ENVS } from '@config/envs';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';
import { VerificationRepositoryContract } from '@shared/database/repositories/verification-repository.interface';
import { MailProvider } from '@shared/providers/mail-provider';
import { CreateUniqueToken } from '@shared/utils/create-unique-token.util';

@Injectable()
export class ResendConfirmationCodeService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
    @Inject('MailProvider')
    private readonly mailProvider: MailProvider,
    @Inject('VerificationRepository')
    private readonly verificationRepository: VerificationRepositoryContract,
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new ConflictException({
        message: 'User not found',
        resource: 'Resend Confirmation Code',
        scope: 'User',
      });
    }

    const verification =
      await this.verificationRepository.findVerificationByToken(user.id);

    if (verification) {
      await this.verificationRepository.deleteVerification(verification.id);
    }

    const token = CreateUniqueToken();

    await this.createVerification(user.id, token);

    await this.sendVerificationEmail(email, user.name, token);
  }

  private async createVerification(userId: string, token: string) {
    return this.verificationRepository.createVerification(userId, token);
  }

  private async sendVerificationEmail(
    email: string,
    name: string,
    token: string,
  ) {
    await this.mailProvider.sendEmail({
      subject: ENVS.SENDGRID.WELCOME_SUBJECT,
      to: email,
      dynamicTemplateData: {
        name,
        token,
        link: `${ENVS.APP_URL}/users/verify-email?token=${token}`,
      },
      templateId: ENVS.SENDGRID.CONFIRM_ACCOUNT_TEMPLATE_ID,
    });
  }
}
