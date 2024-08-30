import { BadRequestException, Injectable } from "@nestjs/common";
import { NewPostDto } from "./dto/new-post.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "./schema/post.schema";
import { Model } from "mongoose";
import { UserDocument } from "../user/schema/user.schema";
import { FirebaseService } from "../services/firebase.service";
import { getDownloadURL } from "firebase-admin/storage";
import { GetPostsFeedParams } from "./dto/get-posts-feed-params.dto";
import { PostReaction, PostReactionDocument } from "./schema/post-reaction.schema";
import { PostReactionDto } from "./dto/post-reaction.dto";
import { PostCommentDto } from "./dto/post-comment.dto";
import { PostComment, PostCommentDocument } from "./schema/post-comment.schema";
import { Follower, FollowerDocument } from "../user/schema/follower.schema";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(PostReaction.name) private postReactionModel: Model<PostReactionDocument>,
    @InjectModel(PostComment.name) private postCommentModel: Model<PostCommentDocument>,
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
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

  async getPostsFeed(params: GetPostsFeedParams, extraQuery: any = {}) {
    let query: any = {};
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

    query = {
      ...query,
      ...extraQuery,
    };

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
      {
        $lookup:
        {
          from: 'postcomments',
          localField: '_id',
          foreignField: 'post',
          pipeline: [
            {
              $count: 'total',
            },
          ],
          as: 'comments',
        },
      },
      { $unwind: { path: '$comments', preserveNullAndEmptyArrays: true } },
    ]);
    return { posts };
  }

  async getPostsFollowingFeed(params: GetPostsFeedParams, user: UserDocument) {
    const following = await this.followerModel.find({
      follower: user._id,
    });
    const followingIds = following.map(f => f.user);
    return this.getPostsFeed(params, { user: { $in: followingIds } });
  }

  async addPostReaction(postId: string, user: UserDocument, body: PostReactionDto) {
    const reaction = new this.postReactionModel({
      post: postId,
      user: user._id,
      reaction: body.reaction,
    });
    await reaction.save();
    return { reaction };
  }

  async addPostComment(postId: string, user: UserDocument, body: PostCommentDto) {
    const comment = new this.postCommentModel({
      post: postId,
      user: user._id,
      comment: body.comment,
    });
    await comment.save();
    return { comment };
  }

  async getPostComments(postId: string) {
    const comments = await this.postCommentModel.find({
      post: postId,
    }).populate({ path: 'user', select: 'username avatar' });
    return { comments };
  }
}