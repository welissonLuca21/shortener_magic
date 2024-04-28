import { Global, Module } from '@nestjs/common';
import { HashProvider } from './hash.provider';
import { JwtProvider } from './jwt.provider';
import { JwtModule } from '@nestjs/jwt';
import { ENVS } from '@config/envs';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: ENVS.JWT.SECRET,
      signOptions: {
        expiresIn: ENVS.JWT.EXPIRES_IN,
      },
    }),
  ],
  providers: [
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
    {
      provide: 'JwtProvider',
      useClass: JwtProvider,
    },
  ],
  exports: ['HashProvider', 'JwtProvider'],
})
export class ProvidersModule {}
