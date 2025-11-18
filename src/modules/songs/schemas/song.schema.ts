import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
}

export const SongSchema = SchemaFactory.createForClass(Song);
