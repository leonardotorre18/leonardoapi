import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Album } from '../../albums/schemas/album.schema';
import { Author } from '../../authors/schemas/author.schema';
import { FileSaved } from '../../files-storage/types/file.interface';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  title: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Album.name,
  })
  album: Album;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Author.name,
  })
  author: Author;

  @Prop({
    required: true,
    type: FileSaved,
  })
  audio: FileSaved
}

export const SongSchema = SchemaFactory.createForClass(Song);
