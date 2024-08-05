import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserDocument } from '../../user/schema/user.schema';

@Schema({ _id: false })
export class PostOptions {
  @Prop({ type: Boolean, default: true })
  commentsOn: boolean;

  @Prop({ type: Boolean, default: true })
  public: boolean;
}

export const PostOptionsSchema = SchemaFactory.createForClass(PostOptions);

@Schema({ _id: false })
export class PostMedia {
  @Prop({ type: String, required: true })
  mimetype: string;

  @Prop({ type: String, required: true })
  url: string;
}

export const PostMediaSchema = SchemaFactory.createForClass(PostMedia);

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({ required: true, type: String })
  text: string;

  @Prop({ required: true, type: String })
  topic: string;

  @Prop({ required: true, type: String })
  mood: string;

  @Prop({ type: PostMediaSchema, required: true })
  media: PostOptions;

  @Prop({ type: PostOptionsSchema, default: {} })
  options: PostOptions;
}

export const PostSchema = SchemaFactory.createForClass(Post);
