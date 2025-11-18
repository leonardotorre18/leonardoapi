import { IsNotEmpty, IsString } from 'class-validator';
export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  public readonly album: string;

  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly author: string;
}
