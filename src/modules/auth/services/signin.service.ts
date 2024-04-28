import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { AuthResponseDTO } from '../dtos/auth-response.dto';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';
import { HashProviderContract } from '@shared/providers/interfaces/hash-provider.interface';
import { JwtProviderContract } from '@shared/providers/interfaces/jwt-provider.interface';

@Injectable()
export class SigninService {
  constructor(
    @Inject('UserRepository')
    private readonly usersRepository: UserRepositoryContract,
    @Inject("HashProvider")
    private readonly hashProvider: HashProviderContract,
    @Inject("JwtProvider")
    private readonly jwtProvider: JwtProviderContract,
  ) {}

  async execute({ email, password }: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (user.deletedAt) {
      throw new UnauthorizedException({
        message: 'User is deleted',
        resource: 'Signin',
        scope: 'User',
      });
    }

    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid username or password',
        resource: 'Signin',
        scope: 'User',
      });
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException({
        message: 'Invalid username or password',
        resource: 'Signin',
        scope: 'User',
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
      avatar: user?.avatar,
    };
    const token = await this.jwtProvider.encryptToken(payload);
    const expirationDate = await this.jwtProvider.getExpirationDate(token);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user?.avatar,
        surname: user?.surname,
      },
      accessToken: token,
      expires: expirationDate.toISOString(),
    };
  }
}
