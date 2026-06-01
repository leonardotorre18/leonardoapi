import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "@prisma/client";

export class LoginDTO implements Pick<User & { password: string }, 'email'> {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}