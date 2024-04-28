import { Inject } from '@nestjs/common';
import { CreateShortnedUrlDto } from '@shared/database/dtos/create-shortned-url.dto';
import { ShortnedUrlModel } from '@shared/database/models/shortnerd-url.model';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

export class CreateShortnedUrlService {
  constructor(
    @Inject('ShortnedUrlRepository')
    private readonly shortnerRepository: ShortnedUrlRepositoryContract,
  ) {}

  async execute(data: CreateShortnedUrlDto): Promise<ShortnedUrlModel> {
    return this.shortnerRepository.createShortnedUrl(data);
  }
}
