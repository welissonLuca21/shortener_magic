import { CreateUserDto } from '../dtos/create-user.dto';
import { UserModel } from '../models/user.model';

export interface UserRepositoryContract {
  findManyUsers(): Promise<UserModel[]>;
  findUserById(id: string): Promise<UserModel>;
  checkUserExistsByEmail(email: string): Promise<boolean>;
  checkUserExistsByUsername(username: string): Promise<boolean>;
  createUser(data: CreateUserDto): Promise<UserModel>;
  updateUser(id: string, data: CreateUserDto): Promise<void>;
  deleteUser(id: string): Promise<void>;
  restoreUser(id: string): Promise<void>;
}
