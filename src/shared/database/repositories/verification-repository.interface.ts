import { VerificationModel } from '../models/verification.model';

export interface VerificationRepositoryContract {
  createVerification(userId: string, token: string): Promise<VerificationModel>;
  findVerificationByToken(token: string): Promise<VerificationModel>;
  deleteVerification(id: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
}
