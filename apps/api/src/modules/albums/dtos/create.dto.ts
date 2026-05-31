import { IsNotEmpty, IsString } from 'class-validator';
import { Album } from 'generated/prisma/browser';

export class CreateAlbumDTO implements Pick<Album, 'title'|'artistId'> {
  @IsString()
  @IsNotEmpty()
  public readonly title!: string;
  
  @IsString()
  @IsNotEmpty()
  public readonly artistId!: string;
}
