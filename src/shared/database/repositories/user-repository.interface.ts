import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserModel } from '../models/user.model';

export interface UserRepositoryContract {
  findManyUsers(): Promise<UserModel[]>;
  findUserById(id: string): Promise<UserModel>;
  checkUserExistsByEmail(email: string): Promise<boolean>;
  checkUserExistsByUsername(username: string): Promise<boolean>;
  createUser(data: CreateUserDto): Promise<UserModel>;
  updateUser(id: string, data: UpdateUserDto): Promise<void>;
  deleteUser(id: string): Promise<void>;
  restoreUser(id: string): Promise<void>;
  getAllDeletedUsers(): Promise<UserModel[]>;
  findUserByEmail(email: string): Promise<UserModel>;
  deletePermanently(id: string): Promise<void>;
  confirmUserAccount(id: string): Promise<void>;
}
