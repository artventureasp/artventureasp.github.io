import { Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  signup(@Body(new ValidationPipe()) body: SignupDto, @UploadedFile() avatar) {
    return this.authService.signup(body, avatar);
  }
}