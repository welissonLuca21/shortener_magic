import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { HashProviderContract } from './interfaces/hash-provider.interface';

@Injectable()
export class HashProvider implements HashProviderContract {
  async createHash(plaintext: string): Promise<string> {
    return hash(plaintext, 12);
  }

  async compareHash(plaintext: string, digest: string): Promise<boolean> {
    return compare(plaintext, digest);
  }
}
