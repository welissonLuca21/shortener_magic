import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RemoveDisabledShortnedUrl } from './services/remove-disabled-shortned-url.service';
import { RemoveDisabledUsers } from './services/remove-disabled-users.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [RemoveDisabledShortnedUrl, RemoveDisabledUsers],
  exports: [RemoveDisabledShortnedUrl, RemoveDisabledUsers],
})
export class ScheduleTasksModule {}
