import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

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

  @Prop({
    required: false,
    type: [mongoose.Schema.Types.String],
    default: [Role.USER],
    enum: Role
  })
  roles: Role[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  verify: boolean
}

export class UserPublic {
  id: string;
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
