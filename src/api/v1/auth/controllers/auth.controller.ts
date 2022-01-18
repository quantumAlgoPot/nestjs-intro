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
import { User } from '../../user/interface/user';
import { AuthService } from '../service/auth.service';

@Controller('Auth')
export class AuthController {
  constructor(
    protected userService: UserService,
    protected authService: AuthService,
    public readonly responseService: ResponseService,
    public readonly consoleService: ConsoleService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async login(@Body() user: User, @Res() res: Response) {
    try {
      this.responseService.successResponse(
        true,
        await this.authService.login(user),
        res,
      );
    } catch (error) {
      return this.responseService.serverFailureResponse(error.message, res);
    }
  }
}
