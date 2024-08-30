import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import mongoose, { Model } from "mongoose";
import { Post, PostDocument } from "../post/schema/post.schema";
import { Follower, FollowerDocument } from "./schema/follower.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
  ) { }

  async getUserById(userId: string, currentUser: UserDocument) {
    let user = await this.userModel.findById(userId).lean();
    if (!user.settings.public) {
      return {
        user: {
          _id: user._id,
          avatar: user.avatar,
          username: user.username,
          settings: { public: false },
        },
      };
    }
    const followersInfo: any = {};
    followersInfo.followers = await this.followerModel.countDocuments({ user: user._id });
    followersInfo.following = await this.followerModel.countDocuments({ follower: user._id });
    followersInfo.isFollowing = !!(await this.followerModel.countDocuments({ user: user._id, follower: currentUser._id }));
    const userData = {
      ...user,
      followersInfo,
    };
    return { user: userData };
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

  async toggleFollowing(userId: string, currentUser: UserDocument) {
    const follower = await this.followerModel.findOne({
      user: userId,
      follower: currentUser._id,
    });
    if (follower) {
      await follower.deleteOne();
    } else {
      const newFollower = new this.followerModel({
        user: userId,
        follower: currentUser._id,
      });
      await newFollower.save();
    }
    const { user } = await this.getUserById(userId, currentUser);
    
    return { user };
  }
}