import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@shared/database/dtos/create-user.dto';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';
import { HashProviderContract } from '@shared/providers/interfaces/hash-provider.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
    @Inject('HashProvider')
    private readonly hashProvider: HashProviderContract,
  ) {}

  async execute(data: CreateUserDto) {
    const { name, surname, email, username, password } = data;

    const userAlreadyExists =
      await this.userRepository.checkUserExistsByEmail(email);

    console.log('userAlreadyExists', userAlreadyExists);
    if (userAlreadyExists) {
      throw new ConflictException({
        message: 'User e-mail already exists',
        resource: 'Create User',
        scope: 'User',
      });
    }
    console.log('username', username);

    const usernameAlreadyExists =
      await this.userRepository.checkUserExistsByUsername(username);

    if (usernameAlreadyExists) {
      throw new ConflictException({
        message: 'Username already exists',
        resource: 'Create User',
        scope: 'User',
      });
    }

    const passwordHash = await this.hashProvider.createHash(password);

    return this.userRepository.createUser({
      name,
      surname,
      email,
      username,
      password: passwordHash,
    });
  }
}
