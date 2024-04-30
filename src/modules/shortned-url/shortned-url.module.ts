import { Module } from '@nestjs/common';
import { ShortnedController } from './controllers/shortned.controller';
import { CreateShortnedUrlService } from './services/create-shortned.service';
import { DeleteShortnedUrlService } from './services/delete-shortned-url.service';
import { GetAllShortnedUrlService } from './services/get-all-shortned-url.service';
import { GetShortnedUrlByIdService } from './services/get-shortned-by-id.service';
import { RestoreShortnedUrlService } from './services/restore-shortned.service';
import { UpdateShortnedUrlService } from './services/update-shortned.service';
import { GetShortnedUrlByUserIdService } from './services/get-shortned-by-user.service';

@Module({
  controllers: [ShortnedController],
  providers: [
    CreateShortnedUrlService,
    DeleteShortnedUrlService,
    GetAllShortnedUrlService,
    GetShortnedUrlByIdService,
    RestoreShortnedUrlService,
    UpdateShortnedUrlService,
    GetShortnedUrlByUserIdService
  ],
  exports: [
    CreateShortnedUrlService,
    DeleteShortnedUrlService,
    GetAllShortnedUrlService,
    GetShortnedUrlByIdService,
    RestoreShortnedUrlService,
    UpdateShortnedUrlService,
  ],
})
export class ShortnedUrlModule {}
