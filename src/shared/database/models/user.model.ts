import { ShortenedUrlModel } from './shortnerd-url.model';

export interface UserModel {
  id: string;
  username: string;
  email: string;
  avatar?: string | null;
  lastAccess?: Date | null;
  password: string;
  verified: boolean;
  createdAt: Date;
  deletedAt?: Date | null;
  updatedAt?: Date | null;
  shortenedUrls?: ShortenedUrlModel[];
}
