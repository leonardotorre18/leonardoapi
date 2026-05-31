import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class ResendVerificationDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email!: string
}