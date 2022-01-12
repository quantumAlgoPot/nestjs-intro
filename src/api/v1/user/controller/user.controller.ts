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

@Controller('User')
export class UserController {
  constructor(
    protected userService: UserService,
    public readonly responseService: ResponseService,
    public readonly consoleService: ConsoleService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  addProduct(@Body() User: userDto, @Res() res: Response) {
    try {
      validate(User).then((errors) => {
        if (errors.length > 0) {
          this.responseService.badRequestResponse(errors, res);
        }
      });

      const generatedId = this.userService.insertUser(
        User.username,
        User.password,
      );
      this.responseService.successResponse(true, { id: generatedId }, res);
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Get()
  retrieveAllUsers(@Res() res: Response) {
    try {
      return this.responseService.successResponse(
        true,
        this.userService.getAllUsers(),
        res,
      );
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Get(':id')
  retrievSingleUser(@Param('id') UserId: number, @Res() res: Response) {
    try {
      const User = this.userService.getSingleUser(UserId);
      this.consoleService.print(User);
      if (User) {
        return this.responseService.successResponse(true, User, res);
      } else {
        return this.responseService.successResponse(
          false,
          'No Data Found',
          res,
        );
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateSingleUser(
    @Param('id') idOfUser: number,
    @Body() user: userDto,
    @Res() res: Response,
  ) {
    try {
      user.id = idOfUser;
      const updatedUser = this.userService.updateSingleUser(user);
      this.consoleService.print(updatedUser + 'on line');
      if (updatedUser) {
        return this.responseService.successResponse(
          true,
          [...updatedUser],
          res,
        );
      } else {
        return this.responseService.successResponse(
          false,
          'No Data Found',
          res,
        );
      }
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }

  @Delete(':id')
  removeUser(@Param('id') userId: number) {
    try {
      this.userService.deleteUser(userId);
      return null;
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message);
    }
  }
}
