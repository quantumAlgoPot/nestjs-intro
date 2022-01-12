/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
  IsDecimal,
  IsNumber,
} from 'class-validator';

export class userDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
