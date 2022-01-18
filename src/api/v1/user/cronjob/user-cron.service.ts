import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from '../service/user.service';

@Injectable()
export class UserCronService {
  constructor(private userService: UserService) {}
  private readonly logger = new Logger(UserCronService.name);

  @Cron(CronExpression.EVERY_YEAR, { name: 'userCron' })
  async handleCron() {
    this.logger.debug('await this.userService.getAllUsers()');
  }
}
