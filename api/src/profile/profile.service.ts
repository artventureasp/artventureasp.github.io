import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User, UserDocument } from "../user/schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FirebaseService } from "../services/firebase.service";
import { getDownloadURL } from "firebase-admin/storage";
import { Post, PostDocument } from "../post/schema/post.schema";
import { Follower, FollowerDocument } from "../user/schema/follower.schema";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
    private firebaseService: FirebaseService,
  ) {}

  async getProfile(user: UserDocument) {
    const followersInfo: any = {};
    followersInfo.followers = await this.followerModel.countDocuments({ user: user._id });
    followersInfo.following = await this.followerModel.countDocuments({ follower: user._id });
    const userData = {
      ...user.toObject(),
      followersInfo,
    };
    return { user: userData };
  }

  async updateProfile(body: UpdateProfileDto, avatar: any, user: UserDocument) {
    const dbUser = await this.userModel.findById(user._id);

    if (avatar) {
      const filepath = `users/${dbUser._id}/${avatar.originalname}`;
      const fileRef = this.firebaseService.getBucket().file(filepath);
      await fileRef.save(avatar.buffer);
      dbUser.avatar = await getDownloadURL(fileRef);
    }

    if (body.username != undefined) {
      dbUser.username = body.username;
    }
    if (body.about != undefined) {
      dbUser.about = body.about;
    }
    if (body.settings != undefined) {
      if (body.settings.public !== undefined) {
        dbUser.settings.public = body.settings.public;
      }
    }

    try {
      await dbUser.save();
    } catch (err) {
      if (/duplicate/.test(err.message)) {
        throw new ConflictException({ message: 'Username is already taken' });
      }
      throw new BadRequestException({ message: err.message });
    }
    return { user: dbUser };
  }

  async getPosts(user: UserDocument) {
    const posts = await this.postModel.aggregate([
      {
        $match: { user: user._id },
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