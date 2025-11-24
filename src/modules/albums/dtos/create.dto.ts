import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly author: string;
}
