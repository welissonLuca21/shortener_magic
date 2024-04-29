import { ShortnedUrlModel } from '../models/shortnerd-url.model';
import { CreateShortnedUrlDto } from '../dtos/create-shortned-url.dto';

export interface ShortnedUrlRepositoryContract {
  findManyShortnedUrls(): Promise<ShortnedUrlModel[]>;
  findShortnedUrlById(id: string): Promise<ShortnedUrlModel | null>;
  findShortnedUrlByShortnedUrl(
    ShortnedUrl: string,
  ): Promise<ShortnedUrlModel | null>;
  createShortnedUrl(data: CreateShortnedUrlDto): Promise<ShortnedUrlModel>;
  deleteShortnedUrl(id: string): Promise<void>;
  updateShortnedUrl(
    id: string,
    data: Partial<{
      originalUrl: string;
      accessCount: number;
    }>,
  ): Promise<ShortnedUrlModel>;
  restoreShortnedUrl(id: string): Promise<void>;
  incrementAccessCount(id: string): Promise<void>;
  getAllDeletedShortnedUrls(): Promise<ShortnedUrlModel[]>;
  deletePermanently(id: string): Promise<void>;
}
