import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsoleService } from 'src/utils/console/console.service';
import { UserDocument, UserEntity } from '../entity/user.entity';
import { User } from '../interface/user';
import { Connection } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly consoleService: ConsoleService,
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
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

  async getSingleUser(userId: any): Promise<UserEntity> {
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
    // Starting Session for Transaction
    const session = await this.connection.startSession();
    try {
      // Starting Transaction
      session.startTransaction();

      if ((await this.getSingleUser(user.id)) != null) {
        // eslint-disable-next-line no-var
        var toBeUpdatedUser: any = {};
        if (user.username) {
          toBeUpdatedUser.username = user.username;
        }
        if (user.password) {
          toBeUpdatedUser.password = user.password;
        }
        const updateUser = await this.userModel
          .findByIdAndUpdate(
            {
              _id: user.id,
              isDeleted: false,
            },
            toBeUpdatedUser,
          )
          .select('username, password')
          .lean();

        // After succesfully completion commit the transaction
        await session.commitTransaction();
        // Must close the session
        session.endSession();
        return updateUser;
      } else {
        // Must close the session
        session.endSession();
        return null;
      }
    } catch (error) {
      // Roll Back Transaction
      await session.abortTransaction();
      // Must close the session
      session.endSession();

      return error.message;
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
