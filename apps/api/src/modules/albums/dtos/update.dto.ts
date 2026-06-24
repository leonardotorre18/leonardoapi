import { IsOptional, IsString } from 'class-validator';
import { Album } from '@prisma/client';

export class UpdateAlbumDTO implements Pick<Album, 'title'|'artistId'> {
  @IsString()
  @IsOptional()
  public readonly title!: string;
  
  @IsString()
  @IsOptional()
  public readonly artistId!: string;
}
