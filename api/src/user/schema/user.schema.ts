import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class UserSettings {
  @Prop({ type: Boolean, default: false })
  postsHidden: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String })
  about: string;

  @Prop({ type: UserSettingsSchema, default: {} })
  settings: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
