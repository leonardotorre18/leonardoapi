import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/modules/users/schemas/users.schema";

export class RegisterDTO implements User {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}