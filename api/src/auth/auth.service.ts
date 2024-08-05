import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../user/schema/user.schema";
import { Model } from "mongoose";
import { Auth, AuthDocument } from "./schema/auth.schema";
import { randomBytes, scryptSync } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { FirebaseService } from "../services/firebase.service";
import { getDownloadURL } from "firebase-admin/storage";
import { SigninDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {}
  
  async signup(body: SignupDto, avatar: any) {
    const user = new this.userModel({
      email: body.email,
      username: body.username,
    });
    if (avatar) {
      const filepath = `users/${user._id}/${avatar.originalname}`;
      const fileRef = this.firebaseService.getBucket().file(filepath);
      await fileRef.save(avatar.buffer);
      user.avatar = await getDownloadURL(fileRef);
    }
    try {
      await user.save();
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(body.password, salt, 64).toString('hex');
    const auth = new this.authModel({
      email: body.email,
      password: `${salt}:${hashedPassword}`,
      user: user._id,
    });
    try {
      await auth.save();
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }
    return {
      user,
      token: this.jwtService.sign({ sub: user._id }),
    };
  }

  async signin(body: SigninDto) {
    const message = 'Invalid email or password';
    const auth = await this.authModel.findOne({
      email: body.email,
    }).populate('user');
    if (!auth) {
      throw new UnauthorizedException({ message });
    }

    const password = auth.password;
    const salt = password.split(':')[0];
    const hashedPassword = scryptSync(body.password, salt, 64).toString('hex');
    if (hashedPassword !== password.split(':')[1]) {
      throw new UnauthorizedException({ message });
    }
    
    return {
      user: auth.user,
      token: this.jwtService.sign({ sub: auth.user._id }),
    };
  }
}