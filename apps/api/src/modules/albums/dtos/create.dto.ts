import { IsNotEmpty, IsString } from 'class-validator';
import { Album } from '@prisma/client';

export class CreateAlbumDTO implements Pick<Album, 'title'|'artistId'> {
  @IsString()
  @IsNotEmpty()
  public readonly title!: string;
  
  @IsString()
  @IsNotEmpty()
  public readonly artistId!: string;
}
