import { BadRequestException, Injectable } from "@nestjs/common";
import { NewPostDto } from "./dto/new-post.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "./schema/post.schema";
import { Model } from "mongoose";
import { UserDocument } from "../user/schema/user.schema";
import { FirebaseService } from "../services/firebase.service";
import { getDownloadURL } from "firebase-admin/storage";
import { GetPostsFeedParams } from "./dto/get-posts-feed-params.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private firebaseService: FirebaseService,
  ) { }

  async createPost(body: NewPostDto, media: any, user: UserDocument) {
    const newPost = new this.postModel(body);

    newPost.user = user;

    try {
      if (media) {
        const filepath = `posts/${newPost._id}/${media.originalname}`;
        const fileRef = this.firebaseService.getBucket().file(filepath);
        await fileRef.save(media.buffer);
        newPost.media = {
          url: await getDownloadURL(fileRef),
          mimetype: media.mimetype,
          filename: media.originalname,
        };
      }

      await newPost.save();
    } catch (err) {
      if (/validation/.test(err.message)) {
        throw new BadRequestException({ message: err.message });
      }
      throw err;
    }

    return { post: newPost };
  }

  async getPostsFeed(params: GetPostsFeedParams) {
    const query: any = {};
    const limit = 5;
    const skip = (params.page * limit) - limit;

    if (params.filter) {
      const filter = JSON.parse(params.filter);
      if (filter.topics && filter.topics.length) {
        query.topic = { $in: filter.topics };
      }
      if (filter.moods && filter.moods.length) {
        query.mood = { $in: filter.moods };
      }
    }

    const posts = await this.postModel.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      {
        $lookup:
        {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          pipeline: [
            {
              $project: { avatar: 1, username: 1, 'settings.public': 1 },
            },
          ],
          as: 'user',
        }
      },
      {
        $match: { 'user.settings.public': true },
      },
      { $skip: skip },
      { $limit: limit },
      { $unwind: '$user' },
      { $project: { 'user.settings': 0 } },
      {
        $set: {
          user: {
            '$cond': [
              { '$eq': ['$options.public', false] },
              '$$REMOVE',
              '$user',
            ],
          },
        },
      }
    ]);
    return { posts };
  }
}