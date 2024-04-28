import { UserModel } from './user.model';

export interface ShortnedUrlModel {
  id: string;
  originalUrl: string;
  shortnedUrl: string;
  accessCount: number;
  createdAt?: Date | null;
  deletedAt?: Date | null;
  updatedAt: Date;
  userId?: string | null;
  user?: UserModel | null;
}
