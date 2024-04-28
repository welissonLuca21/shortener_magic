export interface HashProviderContract {
  createHash(plaintext: string): Promise<string>;
  compareHash(plaintext: string, digest: string): Promise<boolean>;
}
