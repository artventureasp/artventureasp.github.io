import { BadRequestException, Injectable } from "@nestjs/common";
import { NewPostDto } from "./dto/new-post.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "./schema/post.schema";
import { Model } from "mongoose";
import { UserDocument } from "../user/schema/user.schema";
import { FirebaseService } from "../services/firebase.service";
import { getDownloadURL } from "firebase-admin/storage";

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
}