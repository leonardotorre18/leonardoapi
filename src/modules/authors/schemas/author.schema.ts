import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { FileSaved } from "src/modules/files-storage/types/file.interface";

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  public _id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
  })
  name: string

  @Prop({
    required: true,
    type: FileSaved,
  })
  image: FileSaved
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
