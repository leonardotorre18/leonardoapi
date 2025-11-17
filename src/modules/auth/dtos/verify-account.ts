import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerifyAccountDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  code: number;
}