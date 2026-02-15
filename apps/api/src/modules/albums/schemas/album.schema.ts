import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Author } from "../../authors/schemas/author.schema";
import { FileSaved } from "../../files-storage/types/file.interface";

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
    type: mongoose.Schema.Types.ObjectId,
    ref: Author.name
  })
  author: Author

  @Prop({
    required: true,
    type: FileSaved,
  })
  image: FileSaved
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
