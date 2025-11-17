import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/modules/users/schemas/users.schema";

export type CodeDocument = HydratedDocument<Code>

@Schema()
export class Code {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: User.name
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Number,
  })
  code: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Date,
    default: new Date(Date.now()),
  })
  expiresIn: Date
}

export const CodeSchema = SchemaFactory.createForClass(Code);