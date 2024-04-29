import { Inject, NotFoundException } from '@nestjs/common';
import { UserModel } from '@shared/database/models/user.model';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

export class DeleteShortnedUrlService {
  constructor(
    @Inject('ShortnedUrlRepository')
    private readonly shortnerRepository: ShortnedUrlRepositoryContract,
  ) {}

  async execute(id: string, user: UserModel): Promise<void> {
    const shortnedUrl = await this.shortnerRepository.findShortnedUrlById(id);

    if (!shortnedUrl) {
      throw new NotFoundException({
        message: `Shortned Url with id ${id} not found`,
        resource: 'Delete Shortned Url',
        scope: 'Shortned Url',
      });
    }

    if (shortnedUrl.userId !== user.id) {
      throw new NotFoundException({
        message: `You are not allowed to delete this shortned url`,
        resource: 'Delete Shortned Url',
        scope: 'Shortned Url',
      });
    }

    await this.shortnerRepository.deleteShortnedUrl(id);
  }
}
