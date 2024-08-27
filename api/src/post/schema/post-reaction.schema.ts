import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { UserDocument } from "../../user/schema/user.schema";
import { PostDocument } from "./post.schema";

export type PostReactionDocument = HydratedDocument<PostReaction>;

@Schema({ timestamps: true })
export class PostReaction {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: PostDocument;

  @Prop({ required: true, type: String })
  reaction: string;
}

export const PostReactionSchema = SchemaFactory.createForClass(PostReaction);