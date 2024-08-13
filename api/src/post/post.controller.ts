import { Body, Controller, Post, Req, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { NewPostDto } from "./dto/new-post.dto";
import { PostService } from "./post.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  createPost(
    @Body(new ValidationPipe()) body: NewPostDto,
    @UploadedFile() media: any,
    @Req() req: any,
  ) {
    return this.postService.createPost(body, media, req.user);
  }
}