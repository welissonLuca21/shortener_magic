import { Global, Module } from '@nestjs/common';
import { UserRepository } from './prisma/repositories/user.repository';
import { ShortnedRepository } from './prisma/repositories/shortened-url.repository';
import { PrismaService } from './prisma/prisma.service';

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
  ],
  exports: ['UserRepository', 'ShortnedUrlRepository'],
})
export class DatabaseModule {}
