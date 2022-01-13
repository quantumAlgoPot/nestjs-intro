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
  Request,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConsoleService } from 'src/utils/console/console.service';
import { ResponseService } from 'src/utils/response/response.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuard as AuthenticationGuard } from '../guard/auth.guard';

// import { userDto } from '../dto/user.dto';
// import { User } from '../interface/user';
import { Response } from 'express';
import { validate, ValidationError, validateOrReject } from 'class-validator';
import { UserService } from '../../user/service/user.service';

@Controller('Auth')
export class AuthController {
  constructor(
    protected userService: UserService,
    public readonly responseService: ResponseService,
    public readonly consoleService: ConsoleService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async login(@Body() User: any, @Res() res: Response) {
    try {
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }
  //   @Post()
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @UsePipes(new ValidationPipe({ transform: true }))
  //   addProduct(@Body() User: userDto, @Res() res: Response) {
  //     try {
  //       validate(User).then((errors) => {
  //         console.log(errors);
  //         if (errors.length > 0) {
  //           console.log(errors);
  //           this.responseService.badRequestResponse(errors, res);
  //         }
  //       });

  //       const generatedId = this.userService.insertUser(
  //         User.username,
  //         User.password,
  //       );
  //       this.responseService.successResponse(true, { id: generatedId }, res);
  //     } catch (error) {
  //       return this.responseService.serverFailureResponse(error.message);
  //     }
  //   }

  //   @Get()
  //   retrieveAllUsers(@Res() res: Response) {
  //     try {
  //       return this.responseService.successResponse(
  //         true,
  //         this.userService.getAllUsers(),
  //         res,
  //       );
  //     } catch (error) {
  //       return this.responseService.serverFailureResponse(error.message);
  //     }
  //   }

  //   @Get(':id')
  //   retrievSingleUser(@Param('id') UserId: number, @Res() res: Response) {
  //     try {
  //       const User = this.userService.getSingleUser(UserId);
  //       this.consoleService.print(User);
  //       if (User) {
  //         return this.responseService.successResponse(true, User, res);
  //       } else {
  //         return this.responseService.successResponse(
  //           false,
  //           'No Data Found',
  //           res,
  //         );
  //       }
  //     } catch (error) {
  //       return this.responseService.serverFailureResponse(error.message);
  //     }
  //   }
}
