import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schema/post.schema";
import { ServicesModule } from "../services/services.module";
import { PostReaction, PostReactionSchema } from "./schema/post-reaction.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: PostReaction.name, schema: PostReactionSchema },
    ]),
    ServicesModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}