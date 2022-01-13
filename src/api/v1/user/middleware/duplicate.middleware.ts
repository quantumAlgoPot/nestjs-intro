import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { UserDocument, UserEntity } from '../entity/user.entity';

@Injectable()
export class DuplicateMiddleware implements NestMiddleware {
  constructor(
    private readonly consoleService: ConsoleService,
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private responseService: ResponseService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    try {
      const doubleCheckUser = await this.userModel.find({
        username: req.body.username,
      });
      this.consoleService.print(doubleCheckUser);

      if (doubleCheckUser.length != 0) {
        return this.responseService.dbError('User Already Exists', res);
      }
    } catch (error) {
      this.responseService.serverFailureResponse(error.message, res);
    }
    next();
  }
}
