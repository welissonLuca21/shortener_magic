import { Global, Module } from '@nestjs/common';
import { UserRepository } from './prisma/repositories/user.repository';
import { ShortnedRepository } from './prisma/repositories/shortened-url.repository';
import { PrismaService } from './prisma/prisma.service';
import { VerificationRepository } from './prisma/repositories/verification.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ShortnedUrlRepository',
      useClass: ShortnedRepository,
    },
    {
      provide: 'VerificationRepository',
      useClass: VerificationRepository,
    },
  ],
  exports: [
    'UserRepository',
    'ShortnedUrlRepository',
    'VerificationRepository',
  ],
})
export class DatabaseModule {}
