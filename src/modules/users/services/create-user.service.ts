import { ENVS } from '@config/envs';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@shared/database/dtos/create-user.dto';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';
import { VerificationRepositoryContract } from '@shared/database/repositories/verification-repository.interface';
import { HashProviderContract } from '@shared/providers/interfaces/hash-provider.interface';
import { MailProvider } from '@shared/providers/mail-provider';
import { CreateUniqueToken } from '@shared/utils/create-unique-token.util';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
    @Inject('HashProvider')
    private readonly hashProvider: HashProviderContract,
    @Inject('MailProvider')
    private readonly mailProvider: MailProvider,
    @Inject('VerificationRepository')
    private readonly verificationRepository: VerificationRepositoryContract,
  ) {}

  async execute(data: CreateUserDto) {
    const { name, surname, email, username, password } = data;

    await this.checkUserExistsByEmail(email);
    await this.checkUserExistsByUsername(username);

    const passwordHash = await this.hashPassword(password);

    const user = await this.createUser(
      name,
      surname,
      email,
      username,
      passwordHash,
    );

    const token = CreateUniqueToken();

    await this.createVerification(user.id, token);

    await this.sendVerificationEmail(email, name, token);

    return user;
  }

  private async checkUserExistsByEmail(email: string) {
    const userAlreadyExists = await this.userRepository.findUserByEmail(email);
    if (userAlreadyExists) {
      throw new ConflictException({
        message: 'User e-mail already exists',
        resource: 'Create User',
        scope: 'User',
      });
    }
  }

  private async checkUserExistsByUsername(username: string) {
    const usernameAlreadyExists =
      await this.userRepository.checkUserExistsByUsername(username);
    if (usernameAlreadyExists) {
      throw new ConflictException({
        message: 'Username already exists',
        resource: 'Create User',
        scope: 'User',
      });
    }
  }

  private async hashPassword(password: string) {
    return this.hashProvider.createHash(password);
  }

  private async createUser(
    name: string,
    surname: string,
    email: string,
    username: string,
    passwordHash: string,
  ) {
    return this.userRepository.createUser({
      name,
      surname,
      email,
      username,
      password: passwordHash,
    });
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
