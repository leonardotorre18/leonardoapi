import { IsNotEmpty, IsString } from 'class-validator';
import { Track } from 'generated/prisma/client';

export class CreateTrackDTO implements Pick<Track, 'title'|'albumId'|'artistId'> {
  @IsString()
  @IsNotEmpty()
  public readonly albumId!: string;

  @IsString()
  @IsNotEmpty()
  public readonly artistId!: string;

  @IsString()
  @IsNotEmpty()
  public readonly title!: string;
}
