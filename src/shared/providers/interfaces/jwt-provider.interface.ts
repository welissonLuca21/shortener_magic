export interface JwtProviderContract {
  encryptToken(plaintext: Record<string, any>): Promise<string>
  decryptToken(ciphertext: string): Promise<any>
  getExpirationDate(ciphertext: string): Promise<Date>
}