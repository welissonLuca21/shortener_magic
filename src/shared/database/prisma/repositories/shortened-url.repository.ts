import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ShortenedUrlRepositoryContract } from '../../repositories/shortned-url.interface';

export class ShortenedRepositoryRepository
  extends PrismaService
  implements ShortenedUrlRepositoryContract
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
  private async generateShortenedUrl() {
    const randomUrl = await this.generateRandomString();
    const shortenedUrl = await this.findShortenedUrlByShortenedUrl(randomUrl);

    if (!randomUrl) {
      return randomUrl;
    }

    if (shortenedUrl) {
      return this.generateShortenedUrl();
    }
  }

  async findManyShortenedUrls() {
    return this.shortenedUrl.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findShortenedUrlById(id: string) {
    return this.shortenedUrl.findUnique({
      where: {
        id,
      },
    });
  }

  async findShortenedUrlByShortenedUrl(shortenedUrl: string) {
    return this.shortenedUrl.findUnique({
      where: {
        shortenedUrl,
      },
    });
  }

  async createShortenedUrl(data: Prisma.ShortenedUrlCreateInput) {
    return this.shortenedUrl.create({
      data,
    });
  }
}
