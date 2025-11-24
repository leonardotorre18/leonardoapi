import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAuthorDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

}
