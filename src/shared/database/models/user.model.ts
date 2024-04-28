import { ShortnedUrlModel } from './shortnerd-url.model';

export interface UserModel {
  id: string;
  username: string;
  email: string;
  name: string;
  surname?: string | null;
  avatar?: string | null;
  lastAccess?: Date | null;
  password: string;
  verified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  deletedAt?: Date | null;
  updatedAt?: Date | null;
  ShortnedUrls?: ShortnedUrlModel[];
}
