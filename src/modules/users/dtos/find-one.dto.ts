import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FindOneParams {
  @IsString()
  @IsNotEmpty()
  id: string
}