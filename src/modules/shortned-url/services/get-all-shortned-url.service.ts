import { Inject } from '@nestjs/common';
import { ShortnedUrlModel } from '@shared/database/models/shortnerd-url.model';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

export class GetAllShortnedUrlService {
  constructor(
    @Inject('ShortnedUrlRepository')

    private readonly shortnerRepository: ShortnedUrlRepositoryContract,
  ) {}

  async execute(): Promise<ShortnedUrlModel[]> {
    return this.shortnerRepository.findManyShortnedUrls();
  }
}
