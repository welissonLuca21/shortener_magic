import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';

@Injectable()
export class ListAllUsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
  ) {}

  async execute() {
    return this.userRepository.findManyUsers();
  }
}
