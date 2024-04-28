import { UserModel } from '@shared/database/models/user.model';
import { Inject, NotFoundException } from '@nestjs/common';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

export class UpdateShortnedUrlService {
  constructor(
    @Inject('ShortnedUrlRepository')
    private readonly shortnerRepository: ShortnedUrlRepositoryContract,
  ) {}

  async execute(
    id: string,
    originalUrl: string,
    user?: UserModel,
  ): Promise<void> {
    const ShortnedUrl = await this.shortnerRepository.findShortnedUrlById(id);

    if (!ShortnedUrl) {
      throw new NotFoundException({
        message: `Shortned Url with id ${id} not found`,
        resource: 'Update Shortned Url',
        scope: 'Shortned Url',
      });
    }

    if (ShortnedUrl.userId !== user.id) {
      throw new NotFoundException({
        message: 'You are not allowed to update this Shortned url',
        resource: 'Update Shortned Url',
        scope: 'Shortned Url',
      });
    }

    await this.shortnerRepository.updateShortnedUrl(id, {
      originalUrl: originalUrl,
    });
  }
}
