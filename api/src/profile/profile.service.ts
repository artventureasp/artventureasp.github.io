import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User, UserDocument } from "../user/schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FirebaseService } from "../services/firebase.service";
import { getDownloadURL } from "firebase-admin/storage";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private firebaseService: FirebaseService,
  ) {}

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
      if (body.settings.postsHidden !== undefined) {
        dbUser.settings.postsHidden = body.settings.postsHidden;
      }
    }

    try {
      await dbUser.save();
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }
    return { user: dbUser };
  }
}