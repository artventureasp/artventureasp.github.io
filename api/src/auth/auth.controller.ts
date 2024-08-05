import { Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SkipAuth } from "../decorators/skip-auth.decorator";
import { SigninDto } from "./dto/signin.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  @SkipAuth()
  @UseInterceptors(FileInterceptor('avatar'))
  signup(@Body(new ValidationPipe()) body: SignupDto, @UploadedFile() avatar) {
    return this.authService.signup(body, avatar);
  }

  @Post('signin')
  @SkipAuth()
  signin(@Body(new ValidationPipe()) body: SigninDto) {
    return this.authService.signin(body);
  }
}