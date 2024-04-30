import { VerificationRepositoryContract } from '@shared/database/repositories/verification-repository.interface';
import { PrismaService } from '../prisma.service';

export class VerificationRepository
  extends PrismaService
  implements VerificationRepositoryContract
{
  async createVerification(userId: string, token: string) {
    return this.verification.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        token,
        type: 'EMAIL',
      },
    }) as any;
  }

  async findVerificationByToken(token: string) {
    return this.verification.findFirst({
      where: {
        token,
      },
    }) as any;
  }

  async deleteVerification(id: string) {
    await this.verification.delete({
      where: {
        id,
      },
    });
  }

  async deleteAllByUserId(userId: string) {
    await this.verification.deleteMany({
      where: {
        userId,
      },
    });
  }
}
