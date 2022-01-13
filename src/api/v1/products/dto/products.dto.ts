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
  IsOptional,
} from 'class-validator';

export class productsDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @MinLength(5)
  @MaxLength(10)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  description: string;

  @IsNotEmpty()
  @IsString()
  price: string;
}
