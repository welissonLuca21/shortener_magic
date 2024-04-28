import { Inject, NotFoundException } from '@nestjs/common';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

export class RestoreShortnedUrlService {
  constructor(
    @Inject('ShortnedUrlRepository')

    private readonly shortnerRepository: ShortnedUrlRepositoryContract,
  ) {}

  async execute(id: string): Promise<void> {
    const ShortnedUrl = await this.shortnerRepository.findShortnedUrlById(id);

    if (!ShortnedUrl) {
      throw new NotFoundException({
        message: `Shortned Url with id ${id} not found`,
        resource: 'Restore Shortned Url',
        scope: 'Shortned Url',
      });
    }

    await this.shortnerRepository.restoreShortnedUrl(id);
  }
}
