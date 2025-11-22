import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { FileSaved } from "src/modules/files-storage/types/file.interface";

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
  })
  title: string

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
  })
  author: string

  @Prop({
    required: true,
    type: FileSaved,
  })
  image: FileSaved
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
