import { VerificationType } from '@prisma/client';
import { UserModel } from './user.model';

export interface VerificationModel {
  id: string;
  type: VerificationType;
  userId: string;
  token: string;
  createdAt: Date;
  user: UserModel;
}
