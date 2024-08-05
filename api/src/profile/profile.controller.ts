import { Body, Controller, Put, Req, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfileService } from "./profile.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  @Put()
  @UseInterceptors(FileInterceptor('avatar'))
  updateProfile(
    @Body(new ValidationPipe()) body: UpdateProfileDto,
    @UploadedFile() avatar: any,
    @Req() req: any,
  ) {
    return this.profileService.updateProfile(body, avatar, req.user);
  }
}