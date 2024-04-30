import { Inject } from '@nestjs/common';
import { ShortnedUrlModel } from '@shared/database/models/shortnerd-url.model';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

export class GetShortnedUrlByUserIdService {
  constructor(
    @Inject('ShortnedUrlRepository')
    private readonly shortnerRepository: ShortnedUrlRepositoryContract,
  ) {}

  async execute(id: string): Promise<ShortnedUrlModel[]> {
    return this.shortnerRepository.getAllByUserId(id);
  }
}
