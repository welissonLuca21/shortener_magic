import { PrismaService } from '../prisma.service';
import { UserRepositoryContract } from '../../repositories/user-repository.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';

export class UserRepository
  extends PrismaService
  implements UserRepositoryContract
{
  async findManyUsers() {
    return this.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findUserById(id: string) {
    return this.user.findUnique({
      where: {
        id,
      },

      include: {
        shortenedUrls: true,
      },
    });
  }

  async checkUserExistsByEmail(email: string) {
    return !!this.user.findFirst({
      where: {
        email,
      },
    });
  }

  async checkUserExistsByUsername(username: string) {
    return !!this.user.findFirst({
      where: {
        username,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    return this.user.create({
      data,
    });
  }

  async updateUser(id: string, data: CreateUserDto) {
    await this.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string) {
    await this.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restoreUser(id: string) {
    await this.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
