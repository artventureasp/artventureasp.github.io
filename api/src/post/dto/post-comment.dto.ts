import { IsString } from "class-validator";

export class PostCommentDto {
  @IsString()
  comment: string;
}