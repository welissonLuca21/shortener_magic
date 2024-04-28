import { PrismaService } from '../prisma.service';
import { UserRepositoryContract } from '../../repositories/user-repository.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';

export class UserRepository
  extends PrismaService
  implements UserRepositoryContract
{
  async findManyUsers() {
    return this.user.findMany({
      where: {
        deletedAt: null,
      },
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
        shortnedUrls: true,
      },
    });
  }

  async checkUserExistsByEmail(email: string) {
    const user = await this.user.findFirst({
      where: {
        email,
      },
    });

    return !!user;
  }

  async checkUserExistsByUsername(username: string) {
    const user = await this.user.findFirst({
      where: {
        username,
      },
    });

    return !!user;
  }

  async createUser(data: CreateUserDto) {
    return this.user.create({
      data: {
        email: data.email,
        name: data.name,
        surname: data.surname,
        username: data.username,
        password: data.password,
      },
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

  async getAllDeletedUsers() {
    return this.user.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
      orderBy: {
        deletedAt: 'asc',
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.user.findFirst({
      where: {
        email,
      },
    });
  }
}
