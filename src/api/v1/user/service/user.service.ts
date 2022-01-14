import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsoleService } from 'src/utils/console/console.service';
import { UserDocument, UserEntity } from '../entity/user.entity';
import { User } from '../interface/user';

@Injectable()
export class UserService {
  private user: User[] = [];

  constructor(
    private readonly consoleService: ConsoleService,
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async insertUser(user: User): Promise<UserEntity> {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser?._id;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userModel
      .find({ isDeleted: false })
      .select('username password');
  }

  async getSingleUser(userId: number): Promise<UserEntity> {
    return await this.userModel
      .findOne({
        _id: userId,
        isDeleted: false,
      })
      .select('username password')
      .lean();
  }

  async getSingleUserByName(username: string): Promise<UserEntity> {
    return await this.userModel
      .findOne({
        username: username,
        isDeleted: false,
      })
      .select('username password')
      .lean();
  }

  async updateSingleUser(user: User) {
    this.consoleService.print(user);
    if ((await this.getSingleUser(user.id)) != null) {
      // eslint-disable-next-line no-var
      var toBeUpdatedUser: any = {};
      if (user.username) {
        toBeUpdatedUser.username = user.username;
      }
      if (user.password) {
        toBeUpdatedUser.password = user.password;
      }
      return await this.userModel
        .findByIdAndUpdate(
          {
            _id: user.id,
            isDeleted: false,
          },
          toBeUpdatedUser,
        )
        .select('username, password')
        .lean();
    } else {
      this.consoleService.print('On line 43 of User.Service.ts');
      return null;
    }
  }

  async deleteUser(userId: string): Promise<UserEntity> {
    return await this.userModel
      .findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          isDeleted: true,
        },
      )
      .select('username')
      .lean();
  }
}
