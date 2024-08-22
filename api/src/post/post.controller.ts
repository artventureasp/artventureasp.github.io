import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { NewPostDto } from "./dto/new-post.dto";
import { PostService } from "./post.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetPostsFeedParams } from "./dto/get-posts-feed-params.dto";

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

  @Get()
  getPostsFeed(@Query(new ValidationPipe()) query: GetPostsFeedParams) {
    return this.postService.getPostsFeed(query);
  }
}