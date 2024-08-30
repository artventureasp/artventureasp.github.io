import { Body, Controller, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { NewPostDto } from "./dto/new-post.dto";
import { PostService } from "./post.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetPostsFeedParams } from "./dto/get-posts-feed-params.dto";
import { PostReactionDto } from "./dto/post-reaction.dto";
import { PostCommentDto } from "./dto/post-comment.dto";

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

  @Get('following')
  getPostsFollowingFeed(
    @Query(new ValidationPipe()) query: GetPostsFeedParams,
    @Req() req: any,
  ) {
    return this.postService.getPostsFollowingFeed(query, req.user);
  }

  @Post(':postId/reactions')
  addPostReaction(
    @Param('postId') postId: string,
    @Req() req: any,
    @Body(new ValidationPipe()) body: PostReactionDto,
  ) {
    return this.postService.addPostReaction(postId, req.user, body);
  }

  @Get(':postId/comments')
  getPostComments(
    @Param('postId') postId: string,
  ) {
    return this.postService.getPostComments(postId);
  }

  @Post(':postId/comments')
  addPostComment(
    @Param('postId') postId: string,
    @Req() req: any,
    @Body(new ValidationPipe()) body: PostCommentDto,
  ) {
    return this.postService.addPostComment(postId, req.user, body);
  }
}