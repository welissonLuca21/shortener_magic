import { ShortenedUrlModel } from '../models/shortnerd-url.model';
import { CreateShortenedUrlDto } from '../dtos/create-shortned-url.dto';

export interface ShortenedUrlRepositoryContract {
  findManyShortenedUrls(): Promise<ShortenedUrlModel[]>;
  findShortenedUrlById(id: string): Promise<ShortenedUrlModel | null>;
  findShortenedUrlByShortenedUrl(
    shortenedUrl: string,
  ): Promise<ShortenedUrlModel | null>;
  createShortenedUrl(data: CreateShortenedUrlDto): Promise<ShortenedUrlModel>;
}
