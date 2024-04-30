import { PrismaService } from '../prisma.service';
import { ShortnedUrlRepositoryContract } from '../../repositories/shortned-url.interface';
import { CreateShortnedUrlDto } from '../../dtos/create-shortned-url.dto';

export class ShortnedRepository
  extends PrismaService
  implements ShortnedUrlRepositoryContract
{
  private async generateRandomString() {
    let result = '';

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }
  private async generateShortnedUrl() {
    const randomUrl = await this.generateRandomString();
    const shortnedUrl = await this.findShortnedUrlByShortnedUrl(randomUrl);

    if (!shortnedUrl) {
      return randomUrl;
    }

    if (shortnedUrl) {
      return this.generateShortnedUrl();
    }
  }

  async findManyShortnedUrls() {
    return this.shortnedUrl.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findShortnedUrlById(id: string) {
    return this.shortnedUrl.findUnique({
      where: {
        id,
      },
    });
  }

  async findShortnedUrlByShortnedUrl(shortnedUrl: string) {
    return this.shortnedUrl.findUnique({
      where: {
        shortnedUrl,
      },
    });
  }

  async createShortnedUrl(data: CreateShortnedUrlDto) {
    return this.shortnedUrl.create({
      data: {
        accessCount: 0,
        originalUrl: data.originalUrl,
        shortnedUrl: await this.generateShortnedUrl(),
        userId: data.userId,
      },
    });
  }

  async deleteShortnedUrl(id: string) {
    await this.shortnedUrl.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateShortnedUrl(
    id: string,
    data: Partial<{
      originalUrl: string;
      accessCount: number;
    }>,
  ) {
    return this.shortnedUrl.update({
      where: {
        id,
      },
      data,
    });
  }

  async restoreShortnedUrl(id: string) {
    await this.shortnedUrl.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }

  async incrementAccessCount(id: string) {
    await this.shortnedUrl.update({
      where: {
        id,
      },
      data: {
        accessCount: {
          increment: 1,
        },
      },
    });
  }

  async getAllDeletedShortnedUrls() {
    return this.shortnedUrl.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
    });
  }

  async deletePermanently(id: string) {
    await this.shortnedUrl.delete({
      where: {
        id,
      },
    });
  }

  async getAllByUserId(userId: string) {
    return this.shortnedUrl.findMany({
      where: {
        userId,
      },
    });
  }
}
