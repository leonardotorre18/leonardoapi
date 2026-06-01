import { IsNotEmpty, IsString } from 'class-validator';
import { Track } from '@prisma/client';

export class CreateTrackDTO implements Pick<Track, 'title'|'albumId'> {
  @IsString()
  @IsNotEmpty()
  public readonly albumId!: string;

  @IsString()
  @IsNotEmpty()
  public readonly title!: string;
}
