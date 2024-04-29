import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRepositoryContract } from '@shared/database/repositories/user-repository.interface';

/*
 * This service is responsible for removing all users that are disabled from the database.
 * It will run every day at midnight.
 * It will check all users that are deleted and pass the date of 30 days
 */
@Injectable({
  durable: true, // This will make the job durable, meaning that it will survive server restarts
})
export class RemoveDisabledUsers {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryContract,
  ) {}
  /*
   * This method will run every day at midnight
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'remove-disabled-users',
  })
  async execute() {
    const deletedUsers = await this.userRepository.getAllDeletedUsers();

    deletedUsers.forEach(async (user) => {
      if (user.deletedAt < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
        await this.userRepository.deletePermanently(user.id);
      }
    });
  }
}
