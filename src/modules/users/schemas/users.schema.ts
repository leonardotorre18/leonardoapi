
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  email: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
