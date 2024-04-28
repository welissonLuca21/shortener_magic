import {
  JwtTokenSigninConfig,
  JwtTokenVerifyConfig,
} from '@config/jwt-token.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { JwtProviderContract } from './interfaces/jwt-provider.interface';

@Injectable()
export class JwtProvider implements JwtProviderContract {
  constructor(private readonly jwtService: JwtService) {}
  async encryptToken(plaintext: Record<string, any>): Promise<string> {
    return this.jwtService.sign({ ...plaintext }, JwtTokenSigninConfig);
  }

  async decryptToken(ciphertext: string): Promise<jwt.JwtPayload> {
    return this.jwtService.verify(ciphertext, JwtTokenVerifyConfig) as any;
  }

  async getExpirationDate(ciphertext: string): Promise<Date> {
    const { exp } = await this.decryptToken(ciphertext);
    return new Date(exp * 1000);
  }
}
