import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { Post, PostDocument } from "../post/schema/post.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) { }

  async getUserById(userId: string) {
    let user = await this.userModel.findById(userId).lean();
    if (!user.settings.public) {
      return {
        user: {
          avatar: user.avatar,
          username: user.username,
          settings: { public: false },
        },
      };
    }
    return { user };
  }

  async getUserPosts(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user.settings.public) {
      return { posts: [] };
    }
    const posts = await this.postModel.find({
      user: userId,
      'options.public': true,
    }).sort({ createdAt: -1 });
    return { posts };
  }
}