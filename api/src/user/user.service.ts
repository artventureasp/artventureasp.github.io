import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import mongoose, { Model } from "mongoose";
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
    const posts = await this.postModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          'options.public': true,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup:
        {
          from: 'postreactions',
          localField: '_id',
          foreignField: 'post',
          pipeline: [
            {
              $group: {
                _id: '$reaction',
                total: { $count: { } },
              },
            },
            { $sort: { total: -1 } },
            { $project: { value: '$_id', _id: 0, total: 1 } },
          ],
          as: 'reactions',
        },
      },
    ]);
    return { posts };
  }
}