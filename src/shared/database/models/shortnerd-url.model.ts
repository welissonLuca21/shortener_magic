import { UserModel } from './user.model';

export interface ShortenedUrlModel {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  accessCount: number;
  createdAt?: Date | null;
  deletedAt?: Date | null;
  updatedAt: Date;
  userId?: string | null;
  user?: UserModel | null;
}
