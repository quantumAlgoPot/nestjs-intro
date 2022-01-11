/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
  IsDecimal,
} from 'class-validator';

export class productsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  desc: string;

  @IsNotEmpty()
  @IsString()
  price: string;
}
