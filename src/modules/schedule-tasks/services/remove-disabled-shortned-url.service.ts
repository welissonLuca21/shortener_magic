import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ShortnedUrlRepositoryContract } from '@shared/database/repositories/shortned-url.interface';

/*
 * This service is responsible for removing all shortned-url that are disabled from the database.
 * It will run every day at midnight.
 * It will check all shortned-url that are deleted and pass the date of 30 days
 */
@Injectable({
  durable: true, // This will make the job durable, meaning that it will survive server restarts
})
export class RemoveDisabledShortnedUrl {
  private readonly logger = new Logger(RemoveDisabledShortnedUrl.name);
  constructor(
    @Inject('ShortnedUrlRepository')
    private readonly shortnedUrlRepository: ShortnedUrlRepositoryContract,
  ) {}
  /*
   * This method will run every day at midnight
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'remove-disabled-shortned-url',
  })
  async execute() {
    const shortnedUrls =
      await this.shortnedUrlRepository.getAllDeletedShortnedUrls();

    this.logger.log('Task remove-disabled-shortned-url started');
    shortnedUrls.forEach(async (shortnedUrl) => {
      if (
        shortnedUrl.deletedAt < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ) {
        this.logger.log(
          `Removing permanently shortned-url with id ${shortnedUrl.id}`,
        );
        await this.shortnedUrlRepository.deletePermanently(shortnedUrl.id);
      }
    });

    this.logger.log('Task remove-disabled-shortned-url finished');
  }
}
