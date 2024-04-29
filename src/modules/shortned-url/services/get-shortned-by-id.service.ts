import { Inject, NotFoundException } from '@nestjs/common';
import { ShortnedUrlModel } from '@shared/database/models/shortnerd-url.model';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

export class GetShortnedUrlByIdService {
  constructor(
    @Inject('ShortnedUrlRepository')
    private readonly shortnerRepository: ShortnedUrlRepositoryContract,
  ) {}

  async execute(id: string): Promise<ShortnedUrlModel> {
    const shortnedUrl = await this.shortnerRepository.findShortnedUrlById(id);

    if (!shortnedUrl) {
      throw new NotFoundException({
        message: `Shortned Url with id ${id} not found`,
        resource: 'Get Shortned Url',
        scope: 'Shortned Url',
      });
    }

    await this.shortnerRepository.incrementAccessCount(id);
    return shortnedUrl;
  }
}
