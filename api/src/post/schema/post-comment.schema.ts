import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { UserDocument } from "../../user/schema/user.schema";
import { PostDocument } from "./post.schema";

export type PostCommentDocument = HydratedDocument<PostComment>;

@Schema({ timestamps: true })
export class PostComment {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: PostDocument;

  @Prop({ required: true, type: String })
  comment: string;
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);