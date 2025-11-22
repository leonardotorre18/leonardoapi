import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FileSaved } from 'src/modules/files-storage/types/file.interface';

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
    type: mongoose.Schema.Types.String
  })
  album: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  author: string;

  @Prop({
    required: true,
    type: FileSaved,
  })
  image: FileSaved

  @Prop({
    required: true,
    type: FileSaved,
  })
  audio: FileSaved
}

export const SongSchema = SchemaFactory.createForClass(Song);
