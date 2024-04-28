import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '@shared/database/dtos/update-user.dto';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';
import { HashProviderContract } from '@shared/providers/interfaces/hash-provider.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
    @Inject('HashProvider')
    private readonly hashProvider: HashProviderContract,
  ) {}

  async execute(id: string, data: UpdateUserDto) {
    const { name, surname, username, password } = data;

    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException({
        message: `User with id ${id} not found`,
        resource: 'Update User',
        scope: 'User',
      });
    }

    const matchOldPassword = await this.hashProvider.compareHash(
      data.oldPassword,
      user.password,
    );

    if (!matchOldPassword) {
      throw new ForbiddenException({
        message: 'Old password does not match',
        resource: 'Update User',
        scope: 'ValidationOldPassword',
      });
    }

    const usernameAlreadyExists =
      await this.userRepository.checkUserExistsByUsername(username);

    if (usernameAlreadyExists) {
      throw new Error('Username already exists');
    }

    const passwordHash = await this.hashProvider.createHash(password);

    return this.userRepository.updateUser(id, {
      name,
      surname,
      username,
      password: passwordHash,
    });
  }
}
