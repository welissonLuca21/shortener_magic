import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';
import { HashProviderContract } from '@shared/providers/interfaces/hash-provider.interface';

@Injectable()
export class ValidateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
    @Inject('HashProvider')
    private readonly hashProvider: HashProviderContract,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (passwordMatch) {
      return user;
    }

    return null;
  }
}
