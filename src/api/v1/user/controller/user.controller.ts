/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { userDto } from '../dto/user.dto';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { validate, ValidationError, validateOrReject } from 'class-validator';
import { JwtGuard } from '../../auth/guard/jwt.guard';

@Controller('User')
export class UserController {
  constructor(
    protected userService: UserService,
    public readonly responseService: ResponseService,
    public readonly consoleService: ConsoleService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async addUser(@Body() user: userDto, @Res() res: Response) {
    try {
      validate(user).then((errors) => {
        if (errors.length > 0) {
          this.responseService.badRequestResponse(errors, res);
        }
      });

      const generatedId = await this.userService.insertUser(user);
      this.responseService.successResponse(true, { id: generatedId }, res);
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async retrieveAllUsers(@Res() res: Response) {
    try {
      return this.responseService.successResponse(
        true,
        await this.userService.getAllUsers(),
        res,
      );
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  async retrievSingleUser(@Param('id') UserId: number, @Res() res: Response) {
    try {
      const User = await this.userService.getSingleUser(UserId);
      this.consoleService.print(User);
      if (User) {
        return this.responseService.successResponse(true, User[0], res);
      } else {
        return this.responseService.successResponse(
          false,
          'No Data Found',
          res,
        );
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id')
  async updateSingleUser(
    @Param('id') idOfUser: any,
    @Body() user: User,
    @Res() res: Response,
  ) {
    try {
      user.id = idOfUser;
      const updatedUser = await this.userService.updateSingleUser(user);
      if (updatedUser) {
        return this.responseService.successResponse(true, updatedUser, res);
      } else {
        return this.responseService.successResponse(
          false,
          'No Data Found',
          res,
        );
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  async removeUser(@Param('id') userId: string, @Res() res: Response) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return this.responseService.successResponse(true, deletedUser, res);
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }
}
