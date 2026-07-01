import { Track } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTrackDTO implements Pick<Track, 'title'|'albumId'> {
  @IsString()
  @IsOptional()
  public readonly title!: string;
  
  @IsString()
  @IsOptional()
  public readonly albumId!: string;
}
