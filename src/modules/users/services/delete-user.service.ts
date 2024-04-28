import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException({
        message: `User with id ${id} not found`,
        resource: 'Delete User',
        scope: 'User',
      });
    }

    return this.userRepository.deleteUser(id);
  }
}
